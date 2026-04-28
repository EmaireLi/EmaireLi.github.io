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
