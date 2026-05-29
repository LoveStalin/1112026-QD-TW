
// Hamburger Menu
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}
//Language Translation
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    contact_title: "Contact Information",
    contact_description: "I’m an introvert, but I’m open to conversations when someone takes the initiative to reach out. Below is my contact information. Feel free to connect with me on any of these platforms, and I’ll do my best to respond when I can. Looking forward to hearing from you!"
  },
  vi: {
    nav_home: "Trang chủ",
    nav_about: "Giới thiệu",
    nav_projects: "Các dự án",
    contact_title: "Thông tin liên hệ",

    contact_description: "Tớ hướng nội,nhưng sẵn sàng đối thoại khi có người chủ động liên hệ.Dưới đây là thông tin liên hệ của mình hãy thoải mái kết nối với mình trên bất kỳ nền tảng nào, và mình sẽ cố gắng trả lời khi có thể. Mong được nhận tin nhắn từ bạn!"

  }
};
// Language Toggle
let currentLang = localStorage.getItem("lang") || "en";
const langBtn = document.getElementById("langBtn");

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key] || "";
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
//Offline web
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
      const scale = 1 + Math.sin(Math.PI * t) * 0.06 - t * 0.08;

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
