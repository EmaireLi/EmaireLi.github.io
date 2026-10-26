const MESSAGE_MAX_LENGTH = 100;
const SIGNATURE_MAX_LENGTH = 24;
const DEFAULT_RATE_LIMIT_SECONDS = 60;
const DEFAULT_PAGE_SIZE = 50;
const VISIT_INTERVAL_MS = 60 * 1000;

function normalizeText(value) {
  return String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim();
}

function normalizeSignatureKey(value) {
  return normalizeText(value).toLocaleLowerCase("zh-CN");
}

function charCount(value) {
  return Array.from(String(value || "")).length;
}

function getAllowedOrigins(env) {
  return String(env.ALLOWED_ORIGIN || "*")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isOriginAllowed(request, env) {
  const origin = request.headers.get("Origin");
  const allowedOrigins = getAllowedOrigins(env);
  if (!origin || allowedOrigins.includes("*")) return true;
  return allowedOrigins.includes(origin);
}

function getCorsOrigin(request, env) {
  const origin = request.headers.get("Origin");
  const allowedOrigins = getAllowedOrigins(env);
  if (allowedOrigins.includes("*")) return "*";
  if (origin && allowedOrigins.includes(origin)) return origin;
  return allowedOrigins[0] || "*";
}

function corsHeaders(request, env) {
  return {
    "Access-Control-Allow-Origin": getCorsOrigin(request, env),
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(request, env, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request, env),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function getClientIp(request) {
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) return cfIp;
  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

async function sha256Hex(value) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function getVisitorHash(request, env) {
  const salt = String(env.RATE_LIMIT_SALT || env.ADMIN_TOKEN || "visitor");
  // User-Agent is untrusted metadata, not a visitor identity.
  return sha256Hex(`${salt}:ip:${getClientIp(request)}`);
}

async function readJson(request) {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Content-Type must be application/json.");
  }
  return request.json();
}

function validateMessagePayload(payload, { partial = false } = {}) {
  const source = payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
  const next = {};

  if (!partial || Object.prototype.hasOwnProperty.call(source, "signature")) {
    next.signature = normalizeText(source.signature);
    if (!next.signature) throw new Error("请填写署名。");
    if (charCount(next.signature) > SIGNATURE_MAX_LENGTH) {
      throw new Error(`署名最多 ${SIGNATURE_MAX_LENGTH} 字。`);
    }
    next.signatureKey = normalizeSignatureKey(next.signature);
  }

  if (!partial || Object.prototype.hasOwnProperty.call(source, "message")) {
    next.message = normalizeText(source.message);
    if (!next.message) throw new Error("请填写留言。");
    if (charCount(next.message) > MESSAGE_MAX_LENGTH) {
      throw new Error(`留言最多 ${MESSAGE_MAX_LENGTH} 字。`);
    }
  }

  return next;
}

function requireAdmin(request, env) {
  const expected = String(env.ADMIN_TOKEN || "");
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  return Boolean(expected && token && token === expected);
}

function isUniqueSignatureError(error) {
  return /unique|constraint/i.test(String(error && (error.message || error)));
}

async function listMessages(request, env) {
  const pageSize = Math.min(Number(env.GUESTBOOK_PAGE_SIZE || DEFAULT_PAGE_SIZE) || DEFAULT_PAGE_SIZE, 100);
  const result = await env.DB.prepare(
    `SELECT id, signature, message, created_at, updated_at
      FROM guestbook_messages
      ORDER BY datetime(created_at) DESC
      LIMIT ?`
  )
    .bind(pageSize)
    .all();

  return jsonResponse(request, env, { messages: result.results || [] });
}

async function listAdminMessages(request, env) {
  if (!requireAdmin(request, env)) {
    return jsonResponse(request, env, { error: "Unauthorized." }, 401);
  }
  return listMessages(request, env);
}

async function messageRateClaim(request, env) {
  const configured = Number(env.GUESTBOOK_POST_INTERVAL_SECONDS ?? DEFAULT_RATE_LIMIT_SECONDS);
  const seconds = Number.isFinite(configured) ? Math.max(0, configured) : DEFAULT_RATE_LIMIT_SECONDS;
  if (seconds === 0) return null;
  const salt = String(env.RATE_LIMIT_SALT || env.ADMIN_TOKEN || "guestbook");
  const ipHash = await sha256Hex(`${salt}:${getClientIp(request)}`);
  const now = Math.floor(Date.now() / 1000);
  // A conditional UPSERT claims the interval atomically. It must be batched with
  // the message INSERT so failed writes/duplicate signatures roll it back.
  return {
    seconds,
    ipHash,
    now,
    statement: env.DB.prepare(
      `INSERT INTO guestbook_rate_limits (ip_hash, last_posted_at) VALUES (?, ?)
       ON CONFLICT(ip_hash) DO UPDATE SET last_posted_at = excluded.last_posted_at
       WHERE guestbook_rate_limits.last_posted_at <= ?`
    ).bind(ipHash, now, now - seconds),
  };
}

async function createMessage(request, env) {
  const payload = validateMessagePayload(await readJson(request));
  const rate = await messageRateClaim(request, env);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  try {
    const insert = env.DB.prepare(
      `INSERT INTO guestbook_messages (id, signature, signature_key, message, created_at, updated_at)
       SELECT ?, ?, ?, ?, ?, ? ${rate ? "WHERE changes() > 0" : ""}`
    ).bind(id, payload.signature, payload.signatureKey, payload.message, now, now);
    const results = await env.DB.batch(rate ? [rate.statement, insert] : [insert]);
    if (rate && results[0].meta.changes === 0) {
      const current = await env.DB.prepare("SELECT last_posted_at FROM guestbook_rate_limits WHERE ip_hash = ?").bind(rate.ipHash).first();
      const wait = Math.max(1, Math.ceil(rate.seconds - (rate.now - Number(current?.last_posted_at || rate.now))));
      return jsonResponse(request, env, { error: `发送太频繁，请 ${wait} 秒后再试。` }, 429);
    }
  } catch (error) {
    if (isUniqueSignatureError(error)) {
      return jsonResponse(request, env, { error: "这个署名已经留过言。" }, 409);
    }
    throw error;
  }

  return jsonResponse(request, env, {
    message: {
      id,
      signature: payload.signature,
      message: payload.message,
      created_at: now,
      updated_at: now,
    },
  }, 201);
}

async function updateMessage(request, env, id) {
  if (!requireAdmin(request, env)) {
    return jsonResponse(request, env, { error: "Unauthorized." }, 401);
  }

  const payload = validateMessagePayload(await readJson(request), { partial: true });
  if (!payload.signature && !payload.message) {
    return jsonResponse(request, env, { error: "No changes provided." }, 400);
  }

  const current = await env.DB.prepare("SELECT id, signature, message FROM guestbook_messages WHERE id = ?").bind(id).first();
  if (!current) return jsonResponse(request, env, { error: "Not found." }, 404);

  const nextSignature = payload.signature || current.signature;
  const nextSignatureKey = payload.signatureKey || normalizeSignatureKey(current.signature);
  const nextMessage = payload.message || current.message;
  const now = new Date().toISOString();

  try {
    await env.DB.prepare(
      `UPDATE guestbook_messages
        SET signature = ?, signature_key = ?, message = ?, updated_at = ?
        WHERE id = ?`
    )
      .bind(nextSignature, nextSignatureKey, nextMessage, now, id)
      .run();
  } catch (error) {
    if (isUniqueSignatureError(error)) {
      return jsonResponse(request, env, { error: "这个署名已经留过言。" }, 409);
    }
    throw error;
  }

  return jsonResponse(request, env, {
    message: {
      id,
      signature: nextSignature,
      message: nextMessage,
      updated_at: now,
    },
  });
}

async function deleteMessage(request, env, id) {
  if (!requireAdmin(request, env)) {
    return jsonResponse(request, env, { error: "Unauthorized." }, 401);
  }

  const result = await env.DB.prepare("DELETE FROM guestbook_messages WHERE id = ?").bind(id).run();
  if (!result.meta || result.meta.changes === 0) {
    return jsonResponse(request, env, { error: "Not found." }, 404);
  }
  return jsonResponse(request, env, { ok: true });
}

async function recordVisit(request, env) {
  const visitorHash = await getVisitorHash(request, env);
  const ipAddress = getClientIp(request).slice(0, 80);
  const userAgent = String(request.headers.get("User-Agent") || "unknown").slice(0, 300);
  const now = new Date().toISOString();
  const cutoff = new Date(Date.now() - VISIT_INTERVAL_MS).toISOString();

  // Reuse an existing IP record (including legacy IP+UA identities). Historical
  // rows and totals stay intact. The batch prevents concurrent visits from
  // creating duplicate records or double-incrementing the total.
  const results = await env.DB.batch([
    env.DB.prepare(
      `INSERT OR IGNORE INTO site_visitors
         (visitor_hash, first_seen_at, last_seen_at, visit_count, user_agent, ip_address)
       SELECT ?, ?, ?, 1, ?, ?
       WHERE NOT EXISTS (SELECT 1 FROM site_visitors WHERE ip_address = ?)`
    ).bind(visitorHash, now, now, userAgent, ipAddress, ipAddress),
    env.DB.prepare(
      `INSERT INTO site_stats (key, value, updated_at)
       SELECT 'visitors', 1, ? WHERE changes() > 0
       ON CONFLICT(key) DO UPDATE SET value = value + 1, updated_at = excluded.updated_at`
    ).bind(now),
    env.DB.prepare(
      `UPDATE site_visitors
       SET last_seen_at = ?, visit_count = visit_count + 1, user_agent = ?
       WHERE visitor_hash = (
         SELECT visitor_hash FROM site_visitors WHERE ip_address = ?
         ORDER BY first_seen_at, visitor_hash LIMIT 1
       ) AND last_seen_at <= ?`
    ).bind(now, userAgent, ipAddress, cutoff),
    env.DB.prepare("SELECT value FROM site_stats WHERE key = 'visitors'"),
  ]);
  return jsonResponse(request, env, { visitors: Number(results[3].results[0]?.value) || 0 });
}

async function listAdminVisitors(request, env) {
  if (!requireAdmin(request, env)) {
    return jsonResponse(request, env, { error: "Unauthorized." }, 401);
  }

  const result = await env.DB.prepare(
    `SELECT visitor_hash, first_seen_at, last_seen_at, visit_count, user_agent, ip_address
      FROM site_visitors
      ORDER BY datetime(last_seen_at) DESC
      LIMIT 100`
  ).all();
  const stats = await env.DB.prepare("SELECT value FROM site_stats WHERE key = 'visitors'").first();

  return jsonResponse(request, env, {
    total: Number(stats && stats.value) || 0,
    visitors: result.results || [],
  });
}

async function route(request, env) {
  if (!env.DB) {
    return jsonResponse(request, env, { error: "D1 database binding DB is missing." }, 500);
  }

  if (!isOriginAllowed(request, env)) {
    return jsonResponse(request, env, { error: "Origin not allowed." }, 403);
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/g, "") || "/";
  const messageMatch = path.match(/^\/messages\/([^/]+)$/);

  if (request.method === "GET" && path === "/messages") return listMessages(request, env);
  if (request.method === "GET" && path === "/admin/messages") return listAdminMessages(request, env);
  if (request.method === "GET" && path === "/admin/visitors") return listAdminVisitors(request, env);
  if (request.method === "POST" && path === "/messages") return createMessage(request, env);
  if (request.method === "POST" && path === "/stats/visit") return recordVisit(request, env);
  if (request.method === "PATCH" && messageMatch) return updateMessage(request, env, messageMatch[1]);
  if (request.method === "DELETE" && messageMatch) return deleteMessage(request, env, messageMatch[1]);

  return jsonResponse(request, env, { error: "Not found." }, 404);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    try {
      return await route(request, env);
    } catch (error) {
      return jsonResponse(request, env, { error: error.message || "Internal Server Error." }, error.status || 500);
    }
  },
};
