(() => {
  const readiness = new WeakMap();
  function prepare(img) {
    if (readiness.has(img)) return readiness.get(img);
    if (!img.dataset.preview || (!img.hasAttribute('data-deferred-src') && img.complete && img.naturalWidth)) {
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
      if (img.hasAttribute('data-deferred-src') || !img.naturalWidth) return; // Keep the preview if the full image fails.
      try { await img.decode(); } catch (_) {}
      img.removeEventListener('load', reveal);
      img.classList.add('image-ready');
      setTimeout(() => { img.style.backgroundImage = ''; }, 350);
    };
    img.addEventListener('load', reveal);
    if (img.complete) reveal();
    return ready;
  }
  window.siteImageReady = prepare;
  const queued = new Set();
  const watched = new WeakSet();
  let active = 0;
  let primaryPending = 0;
  let scheduled = false;
  const visible = img => {const r=img.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight;};
  function pump() {
    scheduled = false;
    const candidates = [...queued].filter(img => {
      const r=img.getBoundingClientRect();
      return img.isConnected&&r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight+320;
    }).sort((a,b) => {
      const av=visible(a),bv=visible(b);
      if(av!==bv)return av?-1:1;
      return a.getBoundingClientRect().top-b.getBoundingClientRect().top;
    });
    for(const img of candidates) {
      const inView=visible(img);
      // Reserve a third slot for newly visible images when the reader jumps ahead.
      if(active >= (inView?3:2)) break;
      if(!inView&&primaryPending>0)continue;
      queued.delete(img);active++;
      prepare(img);
      img.fetchPriority=inView?'high':'low';
      img.loading='eager';
      const done=()=>{img.removeEventListener('load',done);img.removeEventListener('error',done);active--;schedule();};
      img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});
      if(img.dataset.deferredSrcset)img.srcset=img.dataset.deferredSrcset;
      img.src=img.dataset.deferredSrc;
      delete img.dataset.deferredSrc;delete img.dataset.deferredSrcset;
    }
  }
  function schedule() {if(!scheduled){scheduled=true;requestAnimationFrame(pump);}}
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting}) => {
      if(isIntersecting){prepare(target);if(target.hasAttribute('data-deferred-src'))queued.add(target);}
      else queued.delete(target);
    });
    schedule();
  }, {rootMargin:'0px 0px 320px 0px'}) : null;
  function watch(root) {
    const images=[...(root.matches?.('img[data-preview]')?[root]:[]),...root.querySelectorAll('img[data-preview]')];
    images.forEach(img=>{
      if(watched.has(img))return;watched.add(img);
      if(visible(img))prepare(img);
      if(!img.hasAttribute('data-deferred-src')&&!img.complete&&visible(img)){
        primaryPending++;
        const done=()=>{primaryPending--;img.removeEventListener('load',done);img.removeEventListener('error',done);schedule();};
        img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});
      }
      if(observer)observer.observe(img);
      else if(img.hasAttribute('data-deferred-src'))queued.add(img);
    });
    schedule();
  }
  watch(document);
  // Dialog images join the same queue only after their contents are inserted.
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{
    if(node.nodeType===1)watch(node);
  }))).observe(document.body,{childList:true,subtree:true});
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
})();
