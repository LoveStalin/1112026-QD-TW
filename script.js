
const openBtn = document.querySelector(".btn.primary"); // View My Achievement
const overlay = document.getElementById("overlay");
const modal = document.getElementById("achievementModal");
const closeBtn = document.getElementById("closeModal");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    modal.classList.add("active");
  });
} else {
  console.warn('openBtn not found');
}

if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (overlay) overlay.addEventListener("click", closeModal);

function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}
const abilitiesBtn = document.querySelector(".btn.secondary"); // My Abillities
const abilitiesModal = document.getElementById("abilitiesModal");
const abilitiesClose = document.querySelector(".abilities-close");

// Open abilities modal
if (abilitiesBtn) {
  abilitiesBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    if (abilitiesModal) abilitiesModal.classList.add("active");
  });
} else {
  console.warn('abilitiesBtn not found');
}

// Close abilities modal
if (abilitiesClose) abilitiesClose.addEventListener("click", closeAbilitiesModal);
if (overlay) overlay.addEventListener("click", closeAbilitiesModal);

function closeAbilitiesModal() {
  overlay.classList.remove("active");
  abilitiesModal.classList.remove("active");
}
// Language Translations
const translations = {
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",

    hero_hi: "Hi, I’m",
    hero_name: "Nguyen Xuan Thanh",
    hero_or: "or",
    hero_alias: "ThanhDeveloper",
    hero_line1: "I build this website",
    hero_line2: "to showcase my portfolio",
    hero_desc: " High Schooler • Frontend developer & Backend developer • Basketball Player • Politics Lover",
    btn_more: "More →",
    btn_achievement: "View My Achievement",
    btn_abilities: "My Abilities",

    modal_achievement_title: "View my achievement",
    modal_waiting_achievement: "Waiting for Update",
    modal_abilities_title: "My Abilities",
    skill_level_general: "General",
    skill_level_colonel: "Colonel",
    skill_level_sergeant: "Sergeant",
    skill_level_private: "Private",
    skill_communication: "Communication & Presentation",
    skill_problem_solving: "Problem Solving",
    skill_leadership: "Leadership",
    achi_basketball: "<h4>Basketball Champion - School Level</h4> <p>Become Champion in December 2025</p>",
    achi_tech: "<h4>Self-taught Front-end & Back-end Developer</h4> <p>Started from July 2025</p>",
    achi_web: "<h4>Multiple Website Projects</h4> <p>Built & deployed independently</p>",
    visitor_title: "Brooo, wanna appear here?Leave a mark on the web so Thanh knows who dropped by!",
    visitor_placeholder: "Write your name here!",
    visitor_btn: "Send",
  },

  vi: {
    nav_about: "Giới thiệu",
    nav_projects: "Các dự án",
    nav_contact: "Liên hệ",

    hero_hi: "Hé lô, mình là",
    hero_name: "Nguyễn Xuân Thành",
    hero_or: "hay",
    hero_alias: "Thành Developer",
    hero_line1: "Mình xây dựng trang web này",
    hero_line2: "để giới thiệu về bản thân mình",
    hero_desc: "Học sinh cấp 3 • Lập trình viên Frontend & Backend • Bôn lờ bóng rổ • Yêu thích chính trị",
    btn_more: "Xem thêm →",
    btn_achievement: "Xem thành tích của mình",
    btn_abilities: "Kỹ năng của mình",

    modal_achievement_title: "Thành tích của mình",
    modal_waiting_achievement: "Đang cập nhật",
    modal_abilities_title: "Kỹ năng của mình",
    skill_level_general: "Đại Tướng",
    skill_level_colonel: "Đại Tá",
    skill_level_sergeant: "Thượng Sĩ",
    skill_level_private: "Binh Nhì",
    skill_communication: "Giao tiếp & Thuyết trình",
    skill_problem_solving: "Giải quyết vấn đề",
    skill_leadership: "Lãnh đạo-Chỉ huy",
    achi_basketball: "<h4>Giải Nhất Bóng Rổ</h4> <p>Vô địch vào Tháng 12 năm 2025</p>",
    achi_tech: "<h4>Lập Trình Viên Tự Học Front-end và Back-end</h4> <p>Khởi đầu vào tháng 7 năm 2025</p>",
    achi_web: "<h4>Hàng loạt các dự án Website</h4> <p>Tự học,xây dựng và triển khai</p>",
    visitor_title: "Brooo, muốn xuất hiện ở đây à?Hãy 'đánh dấu chủ quyền' vào web để Thành biết ai đã ghé thăm nha!",
    visitor_placeholder: "Viết tên của bạn vào đây!",
    visitor_btn: "Gửi",
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
  // placeholder translation
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {

    const key = el.dataset.i18nPlaceholder;

    el.placeholder = translations[lang][key] || "";

  });
  localStorage.setItem("lang", lang);
  currentLang = lang;

  // đổi hình cờ theo ngôn ngữ hiện tại
  langBtn.src = currentLang === "vi" ? "image/uk.png" : "image/vn.png";
}

// click để toggle
if (langBtn) {
  langBtn.addEventListener("click", () => {
    const newLang = currentLang === "vi" ? "en" : "vi";
    setLanguage(newLang);
  });
} else {
  console.warn('langBtn not found');
}

// load trang giữ nguyên ngôn ngữ cũ
setLanguage(currentLang);
// Menu Toggle
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}
// Photo Wall
document.addEventListener('DOMContentLoaded', () => {
  const moreBtn = document.querySelector('.more-btn');
  const overlay = document.getElementById("photo-wall-overlay");
  const closeBtn = document.querySelector(".photo-wall-close");

  moreBtn.addEventListener('click', () => {
    overlay.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
    }
  });
});
const visitorList = document.getElementById("visitorList");

window.onload = () => {

  const savedVisitors =
    JSON.parse(localStorage.getItem("visitors")) || [];

  savedVisitors.forEach(visitor => {
    createVisitor(visitor.name, visitor.time);
  });

};

function addVisitor() {

  const input = document.getElementById("visitorName");

  const name = input.value.trim();

  if (name === "") {
    return;
  }

  const currentTime =
    new Date().toLocaleString("vi-VN");

  createVisitor(name, currentTime);

  const savedVisitors =
    JSON.parse(localStorage.getItem("visitors")) || [];

  savedVisitors.unshift({
    name: name,
    time: currentTime
  });

  localStorage.setItem(
    "visitors",
    JSON.stringify(savedVisitors)
  );

  input.value = "";
}

function createVisitor(name, time) {

  const newVisitor =
    document.createElement("div");

  newVisitor.classList.add("visitor-item");

  newVisitor.innerHTML = `
        <span class="visitor-name">${name}</span>
        đã đến đây!
        <div class="visitor-time">${time}</div>
    `;

  visitorList.prepend(newVisitor);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service worker registered"))
      .catch(err => console.error("Service worker registration failed:", err));
  });
} else {
  console.warn('Service workers are not supported in this browser');
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
