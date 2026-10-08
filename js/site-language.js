(() => {
  const dictionary = window.siteTranslations || {};
  const reverse = new Map(Object.entries(dictionary).map(([en, zh]) => [zh, en]));
  const originals = new WeakMap();
  const attributes = new WeakMap();
  let language = 'en';
  try { if (localStorage.getItem('site-language') === 'zh-CN') language = 'zh-CN'; } catch (_) {}
  function translated(value) {
    const raw = value.trim();
    const source = reverse.get(raw) || raw;
    if (language === 'en') return value.replace(raw, window.siteEnglishCopy?.[source] ?? source);
    if (dictionary[source]) return value.replace(raw, dictionary[source]);
    const arrow = source.match(/^(.*?)(\s*[↗↑])$/);
    if (arrow && dictionary[arrow[1].trim()]) return value.replace(raw, dictionary[arrow[1].trim()] + arrow[2]);
    if (source.startsWith('Enlarge photo: ')) return '放大照片：' + (dictionary[source.slice(15)] || source.slice(15));
    if (/^© \d{4} Jiaju Wu$/.test(source)) return source;
    return value;
  }
  function translate(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest('script,style,.language-switch,[data-original-content]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const value = translated(originals.get(node));
      if (value !== node.nodeValue) node.nodeValue = value;
    }
    root.querySelectorAll('[alt],[aria-label],[title]').forEach(element => {
      if (element.closest('.language-switch')) return;
      if (!attributes.has(element)) attributes.set(element, {});
      const original = attributes.get(element);
      ['alt', 'aria-label', 'title'].forEach(name => {
        if (!element.hasAttribute(name)) return;
        if (!(name in original)) original[name] = element.getAttribute(name);
        const value = translated(original[name]);
        if (element.getAttribute(name) !== value) element.setAttribute(name, value);
      });
    });
  }
  function apply() {
    document.documentElement.lang = language;
    translate(document);
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    requestAnimationFrame(() => dispatchEvent(new Event('resize')));
  }
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      language = button.dataset.language;
      try { localStorage.setItem('site-language', language); } catch (_) {}
      apply();
    });
  });
  // Dialog contents are created on demand from English source templates.
  const dialog = document.getElementById('memory-dialog');
  if (dialog) new MutationObserver(() => translate(dialog)).observe(dialog, { childList:true, subtree:true });
  apply();
})();
