(function () {
  const academicPath = "/projects/";

  function goAcademic(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
    }

    if (window.pjax && typeof window.pjax.loadUrl === "function") {
      window.pjax.loadUrl(academicPath);
    } else {
      window.location.href = academicPath;
    }
  }

  function bindAcademicEntry() {
    window.toRandomPost = function () {
      goAcademic();
    };

    const entries = [
      document.querySelector("#random-hover"),
      document.querySelector("#randomPost_button a"),
      document.querySelector("#menu-randomPost")
    ].filter(Boolean);

    entries.forEach(entry => {
      entry.setAttribute("href", academicPath);
      entry.setAttribute("title", "Research");
      entry.onclick = goAcademic;
    });

    const bannerText = document.querySelector("#random-hover .bannerText");
    if (bannerText && !bannerText.dataset.academicText) {
      const arrow = bannerText.querySelector("i");
      bannerText.textContent = "研究工作";
      if (arrow) bannerText.appendChild(arrow);
      bannerText.dataset.academicText = "true";
    }

    const menuText = document.querySelector("#menu-randomPost span");
    if (menuText) menuText.textContent = "研究工作";
  }

  bindAcademicEntry();
  document.addEventListener("DOMContentLoaded", bindAcademicEntry);
  document.addEventListener("pjax:complete", bindAcademicEntry);
})();
