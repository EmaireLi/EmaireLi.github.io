// Progressive enhancement: photos remain visible if motion or observers are unavailable.
export function createPhotoReveal(wall) {
  const seen = new Set();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const show = (item, immediate = false, delay = 0) => {
    seen.add(item.dataset.photoId);
    if (immediate) item.classList.remove('reveal-enabled');
    item.style.transitionDelay = `${delay}ms`;
    item.classList.remove('reveal-pending');
    observer?.unobserve(item);
  };
  wall.addEventListener('focusin', event => {
    const item = event.target.closest('.photo');
    if (item) show(item, true);
  });
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    observer?.disconnect();
    for (const item of wall.children) show(item, true);
  });
  return {
    reset() { observer?.disconnect(); },
    observe(animate = true) {
      if (!animate) {
        for (const item of wall.children) show(item, true);
        return;
      }
      if (motion.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target, false, Math.min(order++ * 45, 135));
        }
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      for (const item of wall.children) {
        if (seen.has(item.dataset.photoId)) continue;
        item.classList.add('reveal-enabled', 'reveal-pending');
        observer.observe(item);
      }
    },
  };
}
