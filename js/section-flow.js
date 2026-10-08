(() => {
  const store = {get(k){try{return JSON.parse(sessionStorage.getItem(k));}catch{return null;}},set(k,v){try{sessionStorage.setItem(k,JSON.stringify(v));}catch{}}};
  const key = 'section-view:' + location.pathname;
  const filters = [...document.querySelectorAll('[data-blog-filter]')];
  function filter(value) {
    filters.forEach(b => b.setAttribute('aria-pressed',String(b.dataset.blogFilter === value)));
    document.querySelectorAll('[data-categories]').forEach(a => {
      a.hidden = value !== 'all' && !JSON.parse(a.dataset.categories).includes(value);
    });
  }
  filters.forEach(b => b.addEventListener('click',()=>filter(b.dataset.blogFilter)));
  function save() {
    store.set(key,{y:scrollY,open:[...document.querySelectorAll('details')].map(d=>d.open),filter:filters.find(b=>b.getAttribute('aria-pressed')==='true')?.dataset.blogFilter});
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');if(!a)return;
    const u=new URL(a.href,location.href);
    if(u.origin!==location.origin||u.pathname===location.pathname)return;
    save();
    // Only explicit returns restore a saved list; ordinary global navigation starts fresh.
    if(a.matches('.back-link,.article-ending a,[data-section-return]') && store.get('section-view:'+u.pathname))store.set('section-restore',u.pathname);
  });
  function restore(){
    if(store.get('section-restore')!==location.pathname)return;
    const state=store.get(key);store.set('section-restore',null);if(!state)return;
    document.querySelectorAll('details').forEach((d,i)=>d.open=!!state.open[i]);
    if(state.filter)filter(state.filter);
    requestAnimationFrame(()=>scrollTo({top:state.y,behavior:'instant'}));
  }
  if(document.readyState==='complete')restore();else addEventListener('load',restore,{once:true});
})();
