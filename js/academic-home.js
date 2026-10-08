(() => {
  const button = document.getElementById('theme-toggle');
  button.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('home-theme', theme); } catch (_) {}
  });
})();
