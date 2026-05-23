
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
  window.addEventListener("load" ,() => {
    navigator.serviceWorker.register("./sw.js")
.then(() => console.log("ĐỊT MẸ SW RA RỒI~~~~"))
.catch(err=>console.log("NGU LỒN RỒI EM",err));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("basketballLoader");
  const ball = document.getElementById("basketball");
  const scoreText = document.getElementById("scoreText");

  if (!loader || !ball || !scoreText) return;

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
  }

  window.addEventListener("pageshow", resetLoader);

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function(e) {
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

      void ball.offsetWidth;
      ball.classList.add("animate");

      scoreTimer = setTimeout(() => {
        scoreText.classList.add("show");
      }, 950);

      navigationTimer = setTimeout(() => {
        window.location.assign(href);
      }, 1600);
    });
  });
});
