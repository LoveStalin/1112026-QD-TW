const unlockBtn = document.getElementById("unlockProjectBtn");
const passwordInput = document.getElementById("projectPassword");
const lockOverlay = document.getElementById("projectLock");
const errorText = document.getElementById("projectError");

unlockBtn.addEventListener("click", () => {
  if (passwordInput.value === "1112026-SL-TW") { // đổi pass ở đây
    loadingText.classList.remove("hidden");
    unlockBtn.disabled = true;
    setTimeout(() => {
      // cho vào trang chính
      lockOverlay.style.display = "none";
    }, 1500);
  } else {
    errorText.textContent = "Wrong password.";
  }
});
passwordInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    unlockBtn.click();
  }
});
// Menu Toggle
function toggleMenu() {
  const sideMenu = document.getElementById("sideMenu");
  const menuIcon = document.querySelector(".menu-icon");
  const isOpen = sideMenu.classList.toggle("active");

  if (menuIcon) {
    menuIcon.classList.toggle("active", isOpen);
    menuIcon.setAttribute("aria-expanded", String(isOpen));
  }
}

document.querySelector(".menu-icon")?.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleMenu();
  }
});
//Translation
// Language Translations
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_contact: "Contact",
    info_1: " <h3>First Website for Crush</h3> <p>My first website built with pure HTML, CSS & JavaScript.What a Simp Guy at that time😔!</p>",
    info_2: "<h3>Hạc Sẹo Website</h3> <p>A fun project built for my teammates to thank them.</p>",
    info_3: " <h3>Another Crush Website</h3> <p>Besides HTML,CSS,JS;This Website built with NoSQL(MongoDB),python,server.This Website is still under constructed</p>",
  },
  vi: {
    nav_home: "Trang chủ",
    nav_about: "Giới thiệu",
    nav_contact: "Liên hệ",
    info_1: "<h3>Website đầu tiên cho Crush</h3> <p>Website đầu tiên mình xây với HTML,CSS và JavaScript thuần.Lúc đó,tôi đúng là một thằng Simp gái😔",
    info_2: "<h3>Website Hạc Sẹo</h3> <p>Một dự án bựa bựa,xây cho những người anh em của tớ để cảm ơn,tri ân bọn họ.</p>",
    info_3: "<h3>Website về crush khác</h3> <p>Không chỉ viết bằng HTML,CSS,JS;Website này còn được xây thêm NoSQL(MongoDB),python,server.Website này vẫn đang xây dở</p>"
  }
};
// Language Toggle
let currentLang = localStorage.getItem("lang") || "en";
const langBtn = document.getElementById("langBtn");

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = translations[lang][key] || "";
  });

  localStorage.setItem("lang", lang);
  currentLang = lang;

  // đổi hình cờ theo ngôn ngữ hiện tại
  langBtn.src = currentLang === "vi" ? "image/uk.png" : "image/vn.png";
}

// click để toggle
langBtn.addEventListener("click", () => {
  const newLang = currentLang === "vi" ? "en" : "vi";
  setLanguage(newLang);
});

// load trang giữ nguyên ngôn ngữ cũ
setLanguage(currentLang);
//Transition
const items = document.querySelectorAll(".project-item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

items.forEach(item => observer.observe(item));
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("ĐỊT MẸ SW RA RỒI~~~~"))
      .catch(err => console.log("NGU LỒN RỒI EM", err));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("basketballLoader");
  const ball = document.getElementById("basketball");
  const hoop = loader?.querySelector(".hoop");
  const scoreText = document.getElementById("scoreText");
  const SHOT_DURATION = 1000;
  const SCORE_DELAY = SHOT_DURATION - 450;
  const NAVIGATION_DELAY = SHOT_DURATION + 650;

  if (!loader || !ball || !hoop || !scoreText) return;

  let isTransitioning = false;
  let scoreTimer;
  let navigationTimer;

  function resetLoader() {
    isTransitioning = false;
    clearTimeout(scoreTimer);
    clearTimeout(navigationTimer);
    loader.classList.remove("active");
    loader.hidden = true;
    scoreText.classList.remove("show");
    ball.classList.remove("animate");
    ball.getAnimations().forEach(animation => animation.cancel());
    ball.style.transform = "";
  }

  function playBasketballShot() {
    ball.getAnimations().forEach(animation => animation.cancel());
    ball.style.transform = "translate3d(0, 0, 0) rotate(0deg) scale(1)";

    const ballRect = ball.getBoundingClientRect();
    const hoopRect = hoop.getBoundingClientRect();
    const endX = hoopRect.left + hoopRect.width * 0.5 - ballRect.left - ballRect.width * 0.5;
    const endY = hoopRect.top + hoopRect.height * 0.35 - ballRect.top - ballRect.height * 0.5;
    const controlX = endX * 0.48;
    const controlY = Math.min(endY, -window.innerHeight * 0.58);
    const frames = [];
    const frameCount = 36;

    for (let i = 0; i <= frameCount; i++) {
      const t = i / frameCount;
      const curveX = 2 * (1 - t) * t * controlX + t * t * endX;
      const curveY = 2 * (1 - t) * t * controlY + t * t * endY;
      const scale = 1 + Math.sin(Math.PI * t) * 0.06 - t * 0.22;

      frames.push({
        transform: `translate3d(${curveX}px, ${curveY}px, 0) rotate(${780 * t}deg) scale(${scale})`
      });
    }

    ball.animate(frames, {
      duration: SHOT_DURATION,
      easing: "linear",
      fill: "forwards"
    });
  }

  window.addEventListener("pageshow", resetLoader);

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = this.getAttribute("target");

      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target === "_blank" ||
        this.hasAttribute("download") ||
        isTransitioning
      ) {
        return;
      }

      e.preventDefault();
      isTransitioning = true;

      loader.hidden = false;
      loader.classList.add("active");
      scoreText.classList.remove("show");
      ball.classList.remove("animate");

      requestAnimationFrame(playBasketballShot);

      scoreTimer = setTimeout(() => {
        scoreText.classList.add("show");
      }, SCORE_DELAY);

      navigationTimer = setTimeout(() => {
        window.location.assign(href);
      }, NAVIGATION_DELAY);
    });
  });
});
