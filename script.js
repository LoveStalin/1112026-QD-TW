
const openBtn = document.querySelector(".btn.primary"); // View My Achievement
const overlay = document.getElementById("overlay");
const modal = document.getElementById("achievementModal");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  modal.classList.add("active");
});

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}
const abilitiesBtn = document.querySelector(".btn.secondary"); // My Abillities
const abilitiesModal = document.getElementById("abilitiesModal");
const abilitiesClose = document.querySelector(".abilities-close");

// Open abilities modal
abilitiesBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  abilitiesModal.classList.add("active");
});

// Close abilities modal
abilitiesClose.addEventListener("click", closeAbilitiesModal);
overlay.addEventListener("click", closeAbilitiesModal);

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
    hero_alias: "XuanThanhSigma",
    hero_line1: "I build this website",
    hero_line2: "to showcase my portfolio",
    hero_desc: "10th grader • Frontend developer • Basketball Player • Politics Lover",
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
  },

  vi: {
    nav_about: "Giới thiệu",
    nav_projects: "Dự án",
    nav_contact: "Liên hệ",

    hero_hi: "Hé lô, mình là",
    hero_name: "Nguyễn Xuân Thành",
    hero_or: "hay",
    hero_alias: "Xuân Thành Sigma",
    hero_line1: "Mình xây dựng trang web này",
    hero_line2: "để giới thiệu về bản thân mình",
    hero_desc: "Học sinh lớp 10 • Lập trình Frontend • Cầu thủ bóng rổ • Yêu thích chính trị",
    btn_more: "Xem thêm →",
    btn_achievement: "Xem thành tích",
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
  langBtn.src = currentLang === "en" ? "image/uk.png" : "image/vn.png";
}

// click để toggle
langBtn.addEventListener("click", () => {
  const newLang = currentLang === "en" ? "vi" : "en";
  setLanguage(newLang);
});

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