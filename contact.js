
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
    contact_description: "I’m an introvert, but I’m open to conversations when someone takes the initiative to reach out. Below is my contact information. (This idiot is currently looking for a girlfriend, by the way.)"
  },
  vi: {
    nav_home: "Trang chủ",
    nav_about: "Giới thiệu",
    nav_projects: "Dự án",
    nav_contact: "Liên hệ",
    contact_title: "Thông tin liên hệ",
    contact_description: "Tớ hướng nội,nhưng sẵn sàng đối thoại khi có người chủ động liên hệ.Dưới đây là thông tin liên hệ của mình(Thằng ngu này đang tìm kiếm người yêu nhé.)"

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
  langBtn.src = currentLang === "en" ? "image/uk.png" : "image/vn.png";
}

// click để toggle
langBtn.addEventListener("click", () => {
  const newLang = currentLang === "en" ? "vi" : "en";
  setLanguage(newLang);
});

// load trang giữ nguyên ngôn ngữ cũ
setLanguage(currentLang);