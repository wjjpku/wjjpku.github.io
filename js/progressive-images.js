(() => {
  const readiness = new WeakMap();
  function prepare(img) {
    if (readiness.has(img)) return readiness.get(img);
    if (!img.dataset.preview || (img.complete && img.naturalWidth)) {
      const ready = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
      readiness.set(img, ready);
      return ready;
    }
    const appearance = getComputedStyle(img);
    img.style.setProperty('--image-base-filter', appearance.filter === 'none' ? 'blur(0px)' : appearance.filter);
    img.style.backgroundPosition = appearance.objectPosition;
    img.style.backgroundSize = appearance.objectFit === 'contain' ? 'contain' : 'cover';
    img.classList.add('image-preview');
    img.style.backgroundImage = `url("${img.dataset.preview}")`;
    const preview = new Image();
    preview.src = img.dataset.preview;
    const ready = preview.decode().catch(() => {});
    readiness.set(img, ready);
    const reveal = async () => {
      if (!img.naturalWidth) return; // Keep the preview if the full image fails.
      try { await img.decode(); } catch (_) {}
      img.classList.add('image-ready');
      setTimeout(() => { img.style.backgroundImage = ''; }, 350);
    };
    img.addEventListener('load', reveal, {once: true});
    if (img.complete) reveal();
    return ready;
  }
  window.siteImageReady = prepare;
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => { if(isIntersecting){prepare(target);observer.unobserve(target);} });
  }, {rootMargin:'240px'}) : null;
  document.querySelectorAll('img[data-preview]').forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < innerHeight && rect.bottom > 0) prepare(img);
    else if (observer) observer.observe(img);
    else prepare(img);
  });
})();
