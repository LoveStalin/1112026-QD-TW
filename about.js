let typingElements = [];
let typingIndex = 0;
let typingInterval;
let typingTimeout;
let typingRunId = 0;
const typingSpeed = 20;
const delayBetween = 700;

function startTyping() {
  typingRunId++;
  clearInterval(typingInterval);
  clearTimeout(typingTimeout);

  const runId = typingRunId;
  typingElements = document.querySelectorAll(".typing");
  typingIndex = 0;

  typingElements.forEach(el => {
    el.dataset.text = el.innerHTML;
    el.innerHTML = "";
  });

  typeNext(runId);
}

function typeNext(runId) {
  if (runId !== typingRunId) return;
  if (typingIndex >= typingElements.length) return;

  const el = typingElements[typingIndex];
  const text = el.dataset.text;
  let charIndex = 0;

  typingInterval = setInterval(() => {
    if (runId !== typingRunId) {
      clearInterval(typingInterval);
      return;
    }

    el.innerHTML = text.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === text.length) {
      clearInterval(typingInterval);
      typingIndex++;
      typingTimeout = setTimeout(() => typeNext(runId), delayBetween);
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
    about_name: "My full name is <span class=\"text-green\">Nguyen Xuan Thanh</span> – but you can call me <span class=\"text-green\">ThanhDeveloper</span>.",
    about_hobbies: "I love something about <span class=\"text-green\">Military </span> , <span class=\"text-yellow\">Politics</span> ,<span class=\"text-blue\">Aviation </span> and <span class=\"text-orange\">Basketball</span>. I'm also passionate about <span class=\"text-grey\">web development and technology.</span>",
    about_dreams: "Nowadays, I want to become a <span class=\"text-green\">Soldier</span> or <span class=\"text-blue\">Pilot.</span>",
    about_future: "You know, I'm still a student. So I can't decide my future yet. But one thing for sure is that I will try my best to achieve my dreams.",
    about_webdev: "Here’s a little more about what I’ve done in web development so far:",
    about_journey_1: " <span class=\"text-green\">June of 2025:</span> Started learning Front-end (HTML, CSS, JS)",
    about_journey_2: "<span class=\"text-green\">2025–2026:</span> Built full portfolio & projects",
    about_journey_3: "<span class=\"text-green\">Current:</span> Continuing to improve my skills in web development and considering to learn Data Science or Cyber Security",
    about_timeline: "You want to see my deeper information?Check more 😉"
  },

  vi: {
    nav_home: "Trang chủ",
    nav_projects: "Các dự án",
    nav_contact: "Liên hệ",
    about_title: "Thông tin chung về mình",
    about_name: "Tên đầy đủ của mình là <span class=\"text-green\">Nguyễn Xuân Thành</span> – nhưng bạn có thể gọi mình là <span class=\"text-green\">ThanhDeveloper</span>.",
    about_hobbies: " Mình thích những thứ về <span class=\"text-green\">Quân đội </span> , <span class=\"text-yellow\">Chính trị</span> , <span class=\"text-blue\">Máy bay</span> và <span class=\"text-orange\">Bóng rổ</span>. Mình cũng đam mê về <span class=\"text-grey\">phát triển web và công nghệ.</span>",
    about_dreams: " Hiện nay, mình muốn trở thành <span class=\"text-green\">Bộ đội</span> hoặc <span class=\"text-blue\">Phi công.</span>",
    about_future: "Bạn biết đấy, mình vẫn còn là học sinh. Vì vậy mình chưa thể quyết định tương lai của mình. Nhưng một điều chắc chắn là mình sẽ cố gắng hết sức để đạt được ước mơ của mình.",
    about_webdev: "Dưới đây là một chút về những gì mình đã làm trong lĩnh vực phát triển web cho đến nay:",
    about_journey_1: "<span class=\"text-green\">Tháng 6 năm 2025:</span> Bắt đầu học Front-end (HTML, CSS, JS)",
    about_journey_2: "<span class=\"text-green\">2025–2026:</span> Xây dựng portfolio & các dự án hoàn chỉnh",
    about_journey_3: "<span class=\"text-green\">Hiện tại:</span> Tiếp tục cải thiện kỹ năng của bản thân trong phát triển web và đang cân nhắc học ngành Khoa học Dữ liệu và Bảo vệ Mạng",
    about_timeline: "Bạn muốn xem thông tin chi tiết hơn về mình?Xem thêm ở đây 😉"
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
  langBtn.src = currentLang === "vi" ? "image/uk.png" : "image/vn.png";

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
  const newLang = currentLang === "vi" ? "en" : "vi";
  setLanguage(newLang, true); // typing chạy lại khi bấm
});
//hamburger menu
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
  overlay.classList.remove("hidden");
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
  overlay.style.display = "none";
});

// click trong box thì KHÔNG đóng
lockBox.addEventListener("click", e => {
  e.stopPropagation();
});
console.log("LOCK SCRIPT LOADED");
//Offline Web
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
