(() => {
  const world = document.querySelector('.story-world');
  const svg = document.getElementById('vine-canvas');
  const base = document.getElementById('vine-base');
  const grown = document.getElementById('vine-grown');
  const leafLayer = document.getElementById('vine-leaves');
  const branchLayer = document.getElementById('vine-branches');
  const chapters = [...document.querySelectorAll('.chapter, .next-chapter')];
  const navLinks = [...document.querySelectorAll('.year-nav a')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let vineLength = 0;
  let framePending = false;
  let lastActive = '';
  const ns = 'http://www.w3.org/2000/svg';

  function pathIn(layer, d, transform) {
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    if (transform) path.setAttribute('transform', transform);
    layer.appendChild(path);
  }

  function drawVine() {
    const bounds = world.getBoundingClientRect();
    const mobile = innerWidth <= 760;
    const points = chapters.map(chapter => {
      const dot = chapter.querySelector('.pin-dot').getBoundingClientRect();
      return { x: dot.left - bounds.left + dot.width / 2, y: dot.top - bounds.top + dot.height / 2 };
    });
    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${world.offsetHeight}`);
    let d = `M ${points[0].x} 0`;
    let previous = { x: points[0].x, y: 0 };
    leafLayer.replaceChildren();
    branchLayer.replaceChildren();
    points.forEach((point, index) => {
      const bend = mobile ? 14 : 48;
      const direction = index % 2 ? -1 : 1;
      const distance = point.y - previous.y;
      d += ` C ${previous.x + bend * direction} ${previous.y + distance * .36}, ${point.x - bend * direction} ${point.y - distance * .3}, ${point.x} ${point.y}`;
      if (index > 0) {
        const y = previous.y + distance * .52;
        const x = point.x;
        pathIn(leafLayer, 'M0 0C-22 -2 -35 -19 -30 -34C-10 -32 3 -16 0 0ZM0 0L-23 -26', `translate(${x} ${y}) scale(${direction * (mobile ? .65 : 1)} ${mobile ? .65 : 1})`);
        if (!mobile) pathIn(leafLayer, 'M0 0C16 -3 25 -14 24 -25C9 -23 -1 -12 0 0Z', `translate(${x} ${y + 66}) scale(${-direction} 1)`);
      }
      if (index < chapters.length - 1) {
        const copy = chapters[index].querySelector('.chapter-copy').getBoundingClientRect();
        const left = copy.left - bounds.left;
        const right = copy.right - bounds.left;
        const toX = mobile ? left - 8 : (right < point.x ? right + 5 : left - 5);
        pathIn(branchLayer, `M${point.x} ${point.y} Q${(point.x + toX) / 2} ${point.y - 23} ${toX} ${point.y - 4}`);
      }
      previous = point;
    });
    base.setAttribute('d', d);
    grown.setAttribute('d', d);
    vineLength = grown.getTotalLength();
    grown.style.strokeDasharray = `${vineLength}`;
    updateScroll();
  }

  function updateScroll() {
    // Read layout before applying any visual updates.
    const bounds = world.getBoundingClientRect();
    const top = bounds.top;
    const height = world.offsetHeight;
    const total = document.documentElement.scrollHeight - innerHeight;
    const positions = chapters.map(el => ({el, distance: Math.abs(el.getBoundingClientRect().top - innerHeight * .3)}));
    const active = positions.reduce((best, item) => item.distance < best.distance ? item : best).el;
    document.body.classList.toggle('in-timeline', top < innerHeight * .7 && bounds.bottom > 120);
    const fraction = Math.min(1, Math.max(0, (innerHeight * .58 - top) / height));
    grown.style.strokeDashoffset = reducedMotion.matches ? 0 : vineLength * (1 - fraction);
    document.getElementById('reading-progress').style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
    if (active.id !== lastActive) {
      chapters.forEach(el => el.classList.toggle('is-current', el === active));
      navLinks.forEach(link => {
        const current = link.dataset.year === active.id;
        link.classList.toggle('is-current', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      lastActive = active.id;
    }
    framePending = false;
  }
  addEventListener('scroll', () => {
    if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  let drawPending = false;
  function scheduleDraw() {
    if (drawPending) return;
    drawPending = true;
    requestAnimationFrame(() => { drawPending = false; drawVine(); });
  }
  new ResizeObserver(scheduleDraw).observe(world);
  addEventListener('resize', scheduleDraw, { passive: true });
  document.fonts.ready.then(scheduleDraw);
  drawVine();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (!reducedMotion.matches) target.classList.add('reveal-in');
        observer.unobserve(target);
      }
    });
  }, { threshold: .15 });
  document.querySelectorAll('.chapter-media, .memory-blank').forEach(el => observer.observe(el));

  const dialog = document.getElementById('memory-dialog');
  const dialogBody = document.getElementById('dialog-body');
  const heading = document.getElementById('dialog-heading');
  const storyButtons = [...document.querySelectorAll('[data-story]')];
  const pagination = dialog.querySelector('.dialog-pagination');
  let storyIndex = -1;
  let opener;
  let oldOverflow = '';
  function openDialog(button) {
    opener = button;
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('.dialog-close').focus();
  }
  document.querySelectorAll('[data-photo]').forEach(button => {
    button.addEventListener('click', () => {
      pagination.hidden = true;
      heading.textContent = button.dataset.caption || 'A memory';
      const image = document.createElement('img');
      image.src = button.dataset.photo;
      image.alt = button.querySelector('img')?.alt || button.getAttribute('aria-label').replace('Enlarge photo: ', '');
      dialogBody.replaceChildren(image);
      openDialog(button);
    });
  });
  function renderStory(index) {
    storyIndex = index;
    const button = storyButtons[index];
    const content = document.getElementById(`story-${button.dataset.story}`).content.cloneNode(true);
    const title = content.querySelector('h2');
    heading.textContent = title.textContent;
    title.remove();
    dialogBody.replaceChildren(content);
    pagination.hidden = false;
    document.getElementById('dialog-position').textContent = `${index + 1} / ${storyButtons.length}`;
    pagination.querySelector('[data-memory-step="-1"]').disabled = index === 0;
    pagination.querySelector('[data-memory-step="1"]').disabled = index === storyButtons.length - 1;
    dialog.scrollTop = 0;
  }
  storyButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      renderStory(index);
      openDialog(button);
    });
  });
  pagination.querySelectorAll('[data-memory-step]').forEach(button => {
    button.addEventListener('click', () => {
      const index = storyIndex + Number(button.dataset.memoryStep);
      if (index < 0 || index >= storyButtons.length) return;
      renderStory(index);
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = oldOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
