document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");
  const dots = document.querySelectorAll(".timeline-years span");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function showItem(index) {
    items.forEach(item => item.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    items[index].classList.add("active");

    dots.forEach(dot => {
      if (Number(dot.dataset.index) === index) {
        dot.classList.add("active");
      }
    });

    currentIndex = index;
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showItem(Number(dot.dataset.index));
    });
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < items.length - 1) {
      showItem(currentIndex + 1);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      showItem(currentIndex - 1);
    }
  });

  showItem(0);
});
// Hamburger Menu
 function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  }