(() => {
  const article = document.querySelector('.prose');
  const toc = document.getElementById('reading-toc');
  if (article && toc) {
    const heading = article.querySelector('h1');
    if (heading && heading.textContent.trim() === document.querySelector('.article-heading h1')?.textContent.trim()) heading.hidden = true;
    const headings = [...article.querySelectorAll('h2,h3')];
    headings.forEach((h, index) => {
      if (!h.id) h.id = `section-${index + 1}`;
      const link = document.createElement('a');
      link.href = `#${h.id}`;
      link.textContent = h.textContent;
      toc.append(link);
    });
    if (!headings.length) { toc.hidden = true; toc.previousElementSibling.hidden = true; }
    let pending = false;
    function update() {
      let active = headings[0];
      for (const h of headings) if (h.getBoundingClientRect().top < innerHeight * .3) active = h;
      [...toc.children].forEach(a => {
        if (a.hash === `#${active?.id}`) a.setAttribute('aria-current','location');
        else a.removeAttribute('aria-current');
      });
      pending = false;
    }
    addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, {passive:true});
    update();
  }
  document.querySelectorAll('.prose img').forEach(img => {
    img.loading = 'lazy';
    // Support content cached before the old lazy-loader was removed.
    if (img.dataset.lazySrc) img.src = img.dataset.lazySrc;
    if (img.closest('a,button')) return;
    img.tabIndex = 0;
    img.setAttribute('role','button');
    img.setAttribute('aria-label', img.alt || 'Open photograph');
    img.addEventListener('click', () => openImage(img.dataset.originalSrc || img.src, img.alt, img));
    img.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(img.dataset.originalSrc || img.src,img.alt,img); } });
  });
  document.querySelectorAll('a[target="_blank"]').forEach(a => a.rel = 'noopener noreferrer');
  const dialog = document.getElementById('image-viewer');
  const images = [...document.querySelectorAll('.prose img')].filter(img => !img.closest('a,button'));
  const controls = document.createElement('div');
  controls.className = 'viewer-controls';
  const previous = document.createElement('button');
  const next = document.createElement('button');
  previous.type = next.type = 'button';
  const count = document.createElement('span');
  count.className = 'viewer-count';
  count.setAttribute('aria-live','polite');
  controls.append(previous,count,next);
  dialog.append(controls);
  let current = -1;
  function showPhoto(index) {
    current = (index + images.length) % images.length;
    const img = images[current];
    dialog.querySelector('img').src = img.dataset.originalSrc || img.src;
    dialog.querySelector('img').alt = img.alt;
    dialog.querySelector('.viewer-caption').textContent = /^(图片\d+|p\d+|IMG_\d+)$/i.test(img.alt) ? '' : img.alt;
    count.textContent = `${current + 1} / ${images.length}`;
  }
  previous.addEventListener('click',()=>showPhoto(current - 1));
  next.addEventListener('click',()=>showPhoto(current + 1));
  dialog.addEventListener('keydown',event=>{
    if (controls.hidden) return;
    if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  let opener;
  let overflow;
  function openImage(src, caption, target) {
    opener = target;
    const chinese = document.documentElement.lang === 'zh-CN';
    previous.textContent = chinese ? '← 上一张' : '← Previous';
    next.textContent = chinese ? '下一张 →' : 'Next →';
    controls.hidden = !images.includes(target) || images.length < 2;
    dialog.querySelector('img').src = src;
    dialog.querySelector('img').alt = caption;
    dialog.querySelector('.viewer-caption').textContent = caption;
    if (images.includes(target)) showPhoto(images.indexOf(target));
    overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector('button').focus();
  }
  document.querySelectorAll('[data-view-image]').forEach(button => button.addEventListener('click',()=>openImage(button.dataset.viewImage,button.dataset.caption,button)));
  dialog.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();
  });
  dialog.addEventListener('close',()=>{document.body.style.overflow=overflow;opener?.focus({preventScroll:true});});
})();
