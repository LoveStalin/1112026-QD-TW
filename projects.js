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
    document.getElementById("sideMenu").classList.toggle("active");
}
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