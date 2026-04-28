const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const storageKey = "alex-blog-published-posts";

function getSavedPosts() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(storageKey, JSON.stringify(posts));
}

const panelLinks = document.querySelectorAll("[data-panel-link]");
const panels = document.querySelectorAll("[data-panel]");

function showPanel(name) {
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
  });

  panelLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.panelLink === name);
  });
}

if (panelLinks.length > 0 && panels.length > 0) {
  const initial = window.location.hash.replace("#", "");
  const hasInitial = Array.from(panels).some((panel) => panel.dataset.panel === initial);
  showPanel(hasInitial ? initial : "about");

  panelLinks.forEach((link) => {
    link.addEventListener("click", () => {
      showPanel(link.dataset.panelLink);
    });
  });

  window.addEventListener("hashchange", () => {
    const current = window.location.hash.replace("#", "");
    const valid = Array.from(panels).some((panel) => panel.dataset.panel === current);
    showPanel(valid ? current : "about");
  });
}

const md = typeof window.markdownit === "function" ? window.markdownit({ html: false, linkify: true, breaks: true }) : null;

function initBlogHome() {
  const publishedPosts = document.getElementById("published-posts");
  const reader = document.getElementById("published-reader");
  const readerMeta = document.getElementById("reader-meta");
  const readerTitle = document.getElementById("reader-title");
  const readerContent = document.getElementById("reader-content");

  if (!publishedPosts || !reader || !readerMeta || !readerTitle || !readerContent) {
    return;
  }

  const renderReader = (post) => {
    readerMeta.textContent = `${post.date} · 已发布`;
    readerTitle.textContent = post.title;
    readerContent.innerHTML = md ? md.render(post.markdown) : post.markdown;
    reader.hidden = false;
  };

  const renderList = () => {
    const posts = getSavedPosts();
    publishedPosts.innerHTML = "";

    posts.forEach((post) => {
      const item = document.createElement("li");
      item.className = "blog-item";
      item.innerHTML = `<a class="item-title" href="#blog">${post.title}</a><p class="meta">${post.date} · 已发布</p>`;
      const link = item.querySelector("a");
      if (link) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          renderReader(post);
        });
      }
      publishedPosts.appendChild(item);
    });
  };

  renderList();

  const url = new URL(window.location.href);
  const postId = url.searchParams.get("post");
  if (postId) {
    const post = getSavedPosts().find((p) => p.id === postId);
    if (post) {
      renderReader(post);
    }
  }
}

function initEditorPage() {
  const mdInput = document.getElementById("md-input");
  const mdPreview = document.getElementById("md-preview");
  const mdTitleInput = document.getElementById("md-title-input");
  const publishBtn = document.getElementById("publish-btn");
  const cancelEditorBtn = document.getElementById("cancel-editor-btn");

  if (!mdInput || !mdPreview || !mdTitleInput || !publishBtn || !cancelEditorBtn) {
    return;
  }

  const renderMarkdown = () => {
    mdPreview.innerHTML = md ? md.render(mdInput.value) : mdInput.value;
  };

  mdInput.addEventListener("input", renderMarkdown);
  renderMarkdown();

  publishBtn.addEventListener("click", () => {
    const title = mdTitleInput.value.trim();
    const markdown = mdInput.value.trim();
    if (!title || !markdown) {
      window.alert("请先填写标题和正文再发布。");
      return;
    }

    const post = {
      id: String(Date.now()),
      title,
      markdown,
      date: new Date().toISOString().slice(0, 10),
    };
    const posts = getSavedPosts();
    posts.unshift(post);
    savePosts(posts);

    window.location.href = `./index.html?post=${encodeURIComponent(post.id)}#blog`;
  });

  cancelEditorBtn.addEventListener("click", () => {
    window.location.href = "./index.html#blog";
  });
}

initBlogHome();
initEditorPage();
