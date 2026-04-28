document.getElementById("year").textContent = String(new Date().getFullYear());

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

const mdInput = document.getElementById("md-input");
const mdPreview = document.getElementById("md-preview");
const mdTitleInput = document.getElementById("md-title-input");
const openEditorBtn = document.getElementById("open-editor-btn");
const cancelEditorBtn = document.getElementById("cancel-editor-btn");
const publishBtn = document.getElementById("publish-btn");
const blogHome = document.getElementById("blog-home");
const blogEditorMode = document.getElementById("blog-editor-mode");
const editorActions = document.getElementById("editor-actions");
const publishedPosts = document.getElementById("published-posts");
const reader = document.getElementById("published-reader");
const readerMeta = document.getElementById("reader-meta");
const readerTitle = document.getElementById("reader-title");
const readerContent = document.getElementById("reader-content");
const storageKey = "alex-blog-published-posts";

function setEditorMode(enabled) {
  if (!blogHome || !blogEditorMode || !editorActions) {
    return;
  }
  blogHome.hidden = enabled;
  blogEditorMode.hidden = !enabled;
  editorActions.hidden = !enabled;
}

function getSavedPosts() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(storageKey, JSON.stringify(posts));
}

if (mdInput && mdPreview && typeof window.markdownit === "function") {
  const md = window.markdownit({
    html: false,
    linkify: true,
    breaks: true,
  });

  const renderMarkdown = () => {
    mdPreview.innerHTML = md.render(mdInput.value);
  };

  const renderReader = (post) => {
    if (!reader || !readerMeta || !readerTitle || !readerContent) {
      return;
    }
    readerMeta.textContent = post.date;
    readerTitle.textContent = post.title;
    readerContent.innerHTML = md.render(post.markdown);
    reader.hidden = false;
  };

  const renderPostList = () => {
    if (!publishedPosts) {
      return;
    }
    const posts = getSavedPosts();
    publishedPosts.innerHTML = "";

    posts.forEach((post, idx) => {
      const item = document.createElement("li");
      item.className = "blog-item";
      item.innerHTML = `
        <a class="item-title" href="#blog">${post.title}</a>
        <p class="meta">${post.date} · 已发布</p>
      `;

      const link = item.querySelector("a");
      if (link) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          renderReader(posts[idx]);
        });
      }
      publishedPosts.appendChild(item);
    });
  };

  mdInput.addEventListener("input", renderMarkdown);
  renderMarkdown();
  renderPostList();

  if (openEditorBtn) {
    openEditorBtn.addEventListener("click", () => {
      setEditorMode(true);
      renderMarkdown();
      if (mdTitleInput) {
        mdTitleInput.focus();
      }
    });
  }

  if (cancelEditorBtn) {
    cancelEditorBtn.addEventListener("click", () => {
      setEditorMode(false);
    });
  }

  if (publishBtn) {
    publishBtn.addEventListener("click", () => {
      const title = mdTitleInput ? mdTitleInput.value.trim() : "";
      const markdown = mdInput.value.trim();
      if (!title || !markdown) {
        window.alert("请先填写标题和正文再发布。");
        return;
      }

      const posts = getSavedPosts();
      posts.unshift({
        title,
        markdown,
        date: new Date().toISOString().slice(0, 10),
      });
      savePosts(posts);
      renderPostList();
      renderReader(posts[0]);
      setEditorMode(false);
    });
  }
}
