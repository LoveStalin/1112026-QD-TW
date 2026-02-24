const unlockBtn = document.getElementById("unlockProjectBtn");
const passwordInput = document.getElementById("projectPassword");
const lockOverlay = document.getElementById("projectLock");
const errorText = document.getElementById("projectError");

unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === "1112026-SL-TW") { // đổi pass ở đây
        lockOverlay.style.display = "none";
    } else {
        errorText.textContent = "Wrong password.";
    }
});