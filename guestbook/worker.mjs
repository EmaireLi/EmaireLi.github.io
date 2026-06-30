const MESSAGE_MAX_LENGTH = 100;
const SIGNATURE_MAX_LENGTH = 24;
const DEFAULT_RATE_LIMIT_SECONDS = 60;
const DEFAULT_PAGE_SIZE = 50;

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
    },
  });
}

function getClientIp(request) {
  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("CF-Connecting-IP") || "unknown";
}

async function sha256Hex(value) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
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

async function enforceRateLimit(request, env) {
  const limitSeconds = Number(env.GUESTBOOK_POST_INTERVAL_SECONDS || DEFAULT_RATE_LIMIT_SECONDS) || DEFAULT_RATE_LIMIT_SECONDS;
  if (limitSeconds <= 0) return;

  const salt = String(env.RATE_LIMIT_SALT || env.ADMIN_TOKEN || "guestbook");
  const ipHash = await sha256Hex(`${salt}:${getClientIp(request)}`);
  const now = Math.floor(Date.now() / 1000);
  const current = await env.DB.prepare("SELECT last_posted_at FROM guestbook_rate_limits WHERE ip_hash = ?").bind(ipHash).first();

  if (current && now - Number(current.last_posted_at) < limitSeconds) {
    const wait = limitSeconds - (now - Number(current.last_posted_at));
    const error = new Error(`发送太频繁，请 ${wait} 秒后再试。`);
    error.status = 429;
    throw error;
  }

  return { ipHash, now };
}

async function createMessage(request, env) {
  const payload = validateMessagePayload(await readJson(request));
  const rate = await enforceRateLimit(request, env);
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  try {
    await env.DB.prepare(
      `INSERT INTO guestbook_messages (id, signature, signature_key, message, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(id, payload.signature, payload.signatureKey, payload.message, now, now)
      .run();
  } catch (error) {
    if (isUniqueSignatureError(error)) {
      return jsonResponse(request, env, { error: "这个署名已经留过言。" }, 409);
    }
    throw error;
  }

  if (rate) {
    await env.DB.prepare(
      `INSERT INTO guestbook_rate_limits (ip_hash, last_posted_at)
        VALUES (?, ?)
        ON CONFLICT(ip_hash) DO UPDATE SET last_posted_at = excluded.last_posted_at`
    )
      .bind(rate.ipHash, rate.now)
      .run();
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
  if (request.method === "POST" && path === "/messages") return createMessage(request, env);
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
