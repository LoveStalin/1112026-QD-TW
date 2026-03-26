let typingElements = [];
let typingIndex = 0;
const typingSpeed = 20;
const delayBetween = 700;

function startTyping() {
  typingElements = document.querySelectorAll(".typing");
  typingIndex = 0;

  typingElements.forEach(el => {
    el.dataset.text = el.innerHTML;
    el.innerHTML = "";
  });

  typeNext();
}

function typeNext() {
  if (typingIndex >= typingElements.length) return;

  const el = typingElements[typingIndex];
  const text = el.dataset.text;
  let charIndex = 0;

  const interval = setInterval(() => {
    el.innerHTML = text.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === text.length) {
      clearInterval(interval);
      typingIndex++;
      setTimeout(typeNext, delayBetween);
    }
  }, typingSpeed);
}

// Language Translations
const translations = {
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_contact: "Contact",
    about_title: "About Me",
    about_name: "My full name is <span class=\"text-green\">Nguyễn Xuân Thành</span> – but you can call me <span class=\"text-green\">XuanThanhSigma</span>.",
    about_hobbies: "I love something about <span class=\"text-green\">Military, Politics , </span> <span class=\"text-blue\">Aviation and </span> <span class=\"text-orange\">Basketball</span>. I'm also passionate about <span class=\"text-grey\">web development and technology.</span>",
    about_dreams: " Nowadays, I want to become a <span class=\"text-green\">Soldier</span> or <span class=\"text-blue\">Pilot.</span>",
    about_future: " You know, I'm still a student. So I can't decide my future yet. But one thing for sure is that I will try my best to achieve my dreams.",
    about_webdev: "Here’s a little more about what I’ve done in web development so far:",
    about_journey_1: " <span class=\"text-green\">July of 2025:</span> Started learning Front-end (HTML, CSS, JS)",
    about_journey_2: "<span class=\"text-green\">2025–2026:</span> Built full portfolios & projects",
    about_journey_3: "<span class=\"text-green\">Current:</span> Continuing to improve my skills in web development and hesitating to learn Data Science or Cybersecurity",
    about_timeline: "You want to see my deeper information?Check more 😉"
  },

  vi: {
    nav_home: "Trang chủ",
    nav_projects: "Các dự án",
    nav_contact: "Liên hệ",
    about_title: "Thông tin chung về mình",
    about_name: "Tên đầy đủ của mình là <span class=\"text-green\">Nguyễn Xuân Thành</span> – nhưng bạn có thể gọi mình là <span class=\"text-green\">XuanThanhSigma</span>.",
    about_hobbies: " Mình thích những thứ về <span class=\"text-green\">Quân sự, Chính trị , </span> <span class=\"text-blue\">Hàng không và </span> <span class=\"text-orange\">Bóng rổ</span>. Mình cũng đam mê về <span class=\"text-grey\">phát triển web và công nghệ.</span>",
    about_dreams: " Hiện nay, mình muốn trở thành <span class=\"text-green\">Bộ đội</span> hoặc <span class=\"text-blue\">Phi công.</span>",
    about_future: "Bạn biết đấy, mình vẫn còn là học sinh. Vì vậy mình chưa thể quyết định tương lai của mình. Nhưng một điều chắc chắn là mình sẽ cố gắng hết sức để đạt được ước mơ của mình.",
    about_webdev: "Dưới đây là một chút về những gì mình đã làm trong lĩnh vực phát triển web cho đến nay:",
    about_journey_1: "<span class=\"text-green\">Tháng 7 năm 2025:</span> Bắt đầu học Front-end (HTML, CSS, JS)",
    about_journey_2: "<span class=\"text-green\">2025–2026:</span> Xây dựng các portfolio & dự án hoàn chỉnh",
    about_journey_3: "<span class=\"text-green\">Hiện tại:</span> Tiếp tục cải thiện kỹ năng của bản thân trong phát triển web và đang cân nhắc học ngành Dữ liệu và Bảo vệ Mạng",
    about_timeline: "Bạn muốn xem thông tin chi tiết hơn về mình?Xem thêm ở đây hihi 😉"
  }
};
let currentLang = "en";
const langBtn = document.getElementById("langBtn");

function setLanguage(lang, withTyping = false) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = translations[lang][key] || "";
  });

  localStorage.setItem("lang", lang);
  currentLang = lang;

  // 🔥 đổi hình cờ
  langBtn.src = currentLang === "en" ? "image/uk.png" : "image/vn.png";

  if (withTyping) {
    startTyping();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  currentLang = savedLang;

  setLanguage(currentLang, true); // vẫn giữ typing khi load
});

langBtn.addEventListener("click", () => {
  const newLang = currentLang === "en" ? "vi" : "en";
  setLanguage(newLang, true); // typing chạy lại khi bấm
});
//hamburger menu
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}
// Lock timeline
const PASSWORD = "1112026-SL-TW"; // can change

const link = document.getElementById("privateTimelineLink");
const overlay = document.getElementById("lockOverlay");
const lockBox = document.querySelector(".lock-box");
const unlockBtn = document.getElementById("unlockBtn");
const input = document.getElementById("passwordInput");
const error = document.getElementById("lockError");

link.addEventListener("click", (e) => {
  e.preventDefault(); // chặn vào link
  overlay.style.display = "flex";
  input.focus();
});

unlockBtn.addEventListener("click", unlock);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

function unlock() {
  if (input.value === PASSWORD) {
    // hiện fake loading
    loadingText.classList.remove("hidden");
    unlockBtn.disabled = true;

    setTimeout(() => {
      // cho vào timeline
      window.location.href = "timeline.html";
    }, 1500);
  } else {
    error.innerText = "Wrong password";
    input.value = "";
  }
}
// click ra ngoài box → đóng
overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// click trong box thì KHÔNG đóng
lockBox.addEventListener("click", e => {
  e.stopPropagation();
});
console.log("LOCK SCRIPT LOADED");
link.addEventListener("click", (e) => {
  e.preventDefault();
  alert("This section is encrypted. Please enter the password to access.");
});