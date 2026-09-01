(function () {
  let tipsInterval = null;

  function clearTipsInterval() {
    if (tipsInterval) {
      clearInterval(tipsInterval);
      tipsInterval = null;
    }
  }

  function rotateTips(mask) {
    const show = mask.querySelector("span[data-show]");
    if (!show) return;

    const next = show.nextElementSibling || mask.querySelector(".first-tips") || mask.querySelector("span");
    const up = mask.querySelector("span[data-up]");

    if (!next) return;
    if (up) up.removeAttribute("data-up");

    show.removeAttribute("data-show");
    show.setAttribute("data-up", "");
    next.setAttribute("data-show", "");
  }

  function bindTipsRotation() {
    const mask = document.querySelector("#about-page .aboutsiteTips .mask");
    if (!mask || mask.dataset.aboutTipsReady) return;

    mask.dataset.aboutTipsReady = "global";
    clearTipsInterval();
    tipsInterval = setInterval(() => rotateTips(mask), 2000);
  }

  function moveHelloShapes(hello, clientX, clientY) {
    const rect = hello.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const cursor = hello.querySelector(".cursor");
    const shapes = hello.querySelectorAll(".shape");

    if (cursor) {
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    }

    if (window.gsap && typeof window.gsap.to === "function") {
      window.gsap.to(shapes, { x, y, stagger: -0.1, overwrite: true });
      return;
    }

    shapes.forEach((shape, index) => {
      const delay = index * 45;
      shape.style.transition = `transform 420ms cubic-bezier(.22, 1, .36, 1) ${delay}ms`;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  function bindHelloMotion() {
    const hello = document.querySelector("#about-page .hello-about");
    if (!hello || hello.dataset.aboutMotionReady) return;

    hello.dataset.aboutMotionReady = "global";
    hello.addEventListener("mousemove", event => {
      moveHelloShapes(hello, event.clientX, event.clientY);
    });
    hello.addEventListener("touchmove", event => {
      const touch = event.touches && event.touches[0];
      if (touch) moveHelloShapes(hello, touch.clientX, touch.clientY);
    }, { passive: true });

    const rect = hello.getBoundingClientRect();
    if (rect.width && rect.height) {
      requestAnimationFrame(() => {
        moveHelloShapes(hello, rect.left + rect.width * 0.62, rect.top + rect.height * 0.54);
      });
    }
  }

  function initAboutPageInteractions() {
    if (!document.querySelector("#about-page")) {
      clearTipsInterval();
      return;
    }

    bindTipsRotation();
    bindHelloMotion();
  }

  initAboutPageInteractions();
  document.addEventListener("DOMContentLoaded", initAboutPageInteractions);
  document.addEventListener("pjax:complete", initAboutPageInteractions);
  document.addEventListener("pjax:send", clearTipsInterval);
})();
