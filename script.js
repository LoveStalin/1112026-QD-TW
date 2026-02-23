
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
const abilitiesBtn = document.querySelector(".btn.secondary"); 
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
    modal_abilities_desc: "I'm not done yet :)",
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
    modal_abilities_desc: "Mình chưa hoàn thiện phần này :)"
  }
};
let currentLang = "en";

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key] || "";
  });
  // lưu vào localStorage
  localStorage.setItem("lang", lang);
}

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "vi" : "en";
  langBtn.innerText = currentLang.toUpperCase();
  setLanguage(currentLang);
});

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