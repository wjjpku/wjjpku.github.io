(function () {
  const storageKey = "justin-bilingual-lang";
  const languages = ["en", "zh"];

  function getStoredLanguage() {
    const saved = window.localStorage && window.localStorage.getItem(storageKey);
    return languages.includes(saved) ? saved : "en";
  }

  function hasBilingualContent() {
    return Boolean(
      document.querySelector('[data-bilingual-lang="en"]') &&
      document.querySelector('[data-bilingual-lang="zh"]')
    );
  }

  function updateButtons(language) {
    document.querySelectorAll("[data-bilingual-set]").forEach(button => {
      const active = button.dataset.bilingualSet === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function applyLanguage(language) {
    const nextLanguage = languages.includes(language) ? language : "en";
    document.documentElement.dataset.bilingualActive = nextLanguage;
    document.querySelectorAll("[data-bilingual-lang]").forEach(node => {
      node.hidden = node.dataset.bilingualLang !== nextLanguage;
    });
    updateButtons(nextLanguage);
  }

  function createButton(language, label) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.bilingualSet = language;
    button.addEventListener("click", () => {
      if (window.localStorage) window.localStorage.setItem(storageKey, language);
      applyLanguage(language);
    });
    return button;
  }

  function mountSwitcher() {
    document.querySelectorAll(".bilingual-switch").forEach(node => node.remove());

    if (!hasBilingualContent()) return;

    const target =
      document.querySelector(".about-narrative") ||
      document.querySelector("#equipment") ||
      document.querySelector("#article-container") ||
      document.querySelector("#page");

    if (!target) return;

    const switcher = document.createElement("div");
    switcher.className = "bilingual-switch";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Language switch");
    switcher.append(createButton("zh", "中文"), createButton("en", "EN"));

    target.insertAdjacentElement("beforebegin", switcher);
    applyLanguage(getStoredLanguage());
  }

  mountSwitcher();
  document.addEventListener("DOMContentLoaded", mountSwitcher);
  document.addEventListener("pjax:complete", mountSwitcher);
})();
