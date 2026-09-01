(function () {
  const primaryPath = "/about/";

  function goPrimary(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
    }

    if (window.pjax && typeof window.pjax.loadUrl === "function") {
      window.pjax.loadUrl(primaryPath);
    } else {
      window.location.href = primaryPath;
    }
  }

  function bindPrimaryEntry() {
    window.toRandomPost = function () {
      goPrimary();
    };

    const entries = [
      document.querySelector("#random-hover"),
      document.querySelector("#randomPost_button a"),
      document.querySelector("#menu-randomPost")
    ].filter(Boolean);

    entries.forEach(entry => {
      entry.setAttribute("href", primaryPath);
      entry.setAttribute("title", "About");
      entry.onclick = goPrimary;
    });

    const bannerText = document.querySelector("#random-hover .bannerText");
    if (bannerText && !bannerText.dataset.primaryText) {
      const arrow = bannerText.querySelector("i");
      bannerText.textContent = "About";
      if (arrow) bannerText.appendChild(arrow);
      bannerText.dataset.primaryText = "true";
    }

    const menuText = document.querySelector("#menu-randomPost span");
    if (menuText) menuText.textContent = "About";
  }

  bindPrimaryEntry();
  document.addEventListener("DOMContentLoaded", bindPrimaryEntry);
  document.addEventListener("pjax:complete", bindPrimaryEntry);
})();
