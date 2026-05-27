(() => {
  const STORAGE_KEY = "xhsNotesForPersonalSite";

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function cleanMultiline(text) {
    return String(text || "")
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n");
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function absoluteUrl(value) {
    if (!value) return "";
    try {
      return new URL(value, location.href).href;
    } catch (_error) {
      return "";
    }
  }

  function readNotes() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function writeNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes, null, 2));
  }

  function mergeNote(note) {
    const notes = readNotes();
    const key = note.url || note.title;
    const index = notes.findIndex((item) => (item.url || item.title) === key);
    if (index >= 0) {
      notes[index] = { ...notes[index], ...note };
    } else {
      notes.push(note);
    }
    writeNotes(notes);
    return notes.length;
  }

  function downloadJson() {
    const notes = readNotes();
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "xhs-notes.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function likelyNoteUrl(url) {
    return /xiaohongshu\.com\/(explore|discovery\/item)\//.test(url);
  }

  function extractVisibleNoteLinks() {
    const links = [...document.querySelectorAll("a[href]")]
      .map((link) => {
        const url = absoluteUrl(link.getAttribute("href"));
        if (!likelyNoteUrl(url)) return null;
        const imgAlt = clean(link.querySelector("img[alt]")?.getAttribute("alt"));
        const aria = clean(link.getAttribute("aria-label"));
        const title = clean(link.innerText) || imgAlt || aria || "小红书笔记";
        return { title, url, content: "", tags: [], images: [] };
      })
      .filter(Boolean);

    const seen = new Set();
    return links.filter((note) => {
      if (seen.has(note.url)) return false;
      seen.add(note.url);
      return true;
    });
  }

  function extractDate() {
    const text = document.body.innerText || "";
    const exact = text.match(/\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/);
    if (exact) {
      return exact[0].replace(/[/.]/g, "-").replace(/-(\d)(?=-|$)/g, "-0$1");
    }
    return new Date().toISOString().slice(0, 10);
  }

  function extractTags(text) {
    return unique((text.match(/#[\u4e00-\u9fa5\w-]+/g) || []).map((tag) => tag.replace(/^#/, "")));
  }

  function scoreTextBlock(element) {
    const text = cleanMultiline(element.innerText || "");
    if (text.length < 20) return 0;
    let score = text.length;
    if (element.matches("article, main, [class*=note], [class*=detail], [class*=content], [class*=desc]")) score += 500;
    if (element.querySelector("img")) score += 120;
    return score;
  }

  function extractMainText() {
    const candidates = [...document.querySelectorAll("article, main, section, div, span")]
      .map((element) => ({ element, score: scoreTextBlock(element) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    const text = cleanMultiline(candidates[0]?.element?.innerText || document.body.innerText || "");
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !/^(点赞|评论|收藏|分享|关注|私信|搜索|首页|发现|发布)$/.test(line));

    return lines.join("\n");
  }

  function extractCurrentNote() {
    const metaTitle = clean(document.querySelector("meta[property='og:title']")?.content);
    const heading = clean(document.querySelector("h1")?.innerText);
    const title = heading || metaTitle || clean(document.title).replace(/\s*-\s*小红书$/, "") || "小红书笔记";
    const content = extractMainText();
    const images = unique(
      [...document.querySelectorAll("img[src]")]
        .map((img) => absoluteUrl(img.getAttribute("src")))
        .filter((src) => src && !src.startsWith("data:"))
    );

    return {
      title,
      date: extractDate(),
      url: location.href,
      content,
      tags: extractTags(`${title}\n${content}`),
      images,
    };
  }

  function showPanel() {
    document.getElementById("xhs-exporter-panel")?.remove();

    const panel = document.createElement("div");
    panel.id = "xhs-exporter-panel";
    panel.style.cssText = [
      "position:fixed",
      "right:16px",
      "bottom:16px",
      "z-index:2147483647",
      "width:240px",
      "padding:12px",
      "border:1px solid #ddd",
      "border-radius:8px",
      "background:#fff",
      "box-shadow:0 10px 30px rgba(0,0,0,.18)",
      "font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
      "color:#222",
    ].join(";");

    function button(label, onClick) {
      const node = document.createElement("button");
      node.textContent = label;
      node.style.cssText = "display:block;width:100%;margin:6px 0;padding:7px 8px;border:1px solid #222;background:#fff;color:#222;cursor:pointer";
      node.addEventListener("click", onClick);
      return node;
    }

    const status = document.createElement("p");
    status.style.cssText = "margin:6px 0 0;color:#666;font-size:12px";
    const syncStatus = (message) => {
      status.textContent = `${message} 当前已收集 ${readNotes().length} 条。`;
    };

    panel.appendChild(button("收集当前笔记详情", () => {
      const count = mergeNote(extractCurrentNote());
      syncStatus(`已保存当前笔记。共 ${count} 条。`);
    }));
    panel.appendChild(button("收集当前页可见笔记链接", () => {
      const links = extractVisibleNoteLinks();
      links.forEach(mergeNote);
      syncStatus(`已保存 ${links.length} 个可见链接。`);
    }));
    panel.appendChild(button("下载 xhs-notes.json", () => {
      downloadJson();
      syncStatus("已下载。");
    }));
    panel.appendChild(button("清空已收集内容", () => {
      if (confirm("确定清空当前浏览器里已收集的小红书笔记吗？")) {
        writeNotes([]);
        syncStatus("已清空。");
      }
    }));
    panel.appendChild(status);
    document.body.appendChild(panel);
    syncStatus("导出器已启动。");
  }

  window.XHSExporter = {
    extractCurrentNote,
    extractVisibleNoteLinks,
    readNotes,
    writeNotes,
    downloadJson,
    showPanel,
  };

  showPanel();
})();
