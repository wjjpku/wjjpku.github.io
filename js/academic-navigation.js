(() => {
  const links = [...document.querySelectorAll('.hub-nav a')];
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  const header = document.querySelector('.academic-header');
  let pending = false;
  let lastHeaderHeight = -1;
  function update() {
    const headerHeight = header.getBoundingClientRect().height;
    if (headerHeight !== lastHeaderHeight) {
      document.documentElement.style.setProperty('--academic-header-height', `${headerHeight}px`);
      lastHeaderHeight = headerHeight;
    }
    let active = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= headerHeight + 140) active = section;
    }
    links.forEach(link => {
      const current = !!active && link.hash === `#${active.id}`;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    pending = false;
  }
  addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update, { passive: true });
  new ResizeObserver(update).observe(header);
  // Preserve older direct links to the former CV sections.
  const aliases = { '#work': '#projects', '#skills': '#projects', '#teaching': '#projects' };
  if (aliases[location.hash]) location.replace(aliases[location.hash]);
  update();
})();
