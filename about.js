const data = [
  {
    title: "2010 — Spawned",
    text: "I was born in Vietnam. Everything went smoothly.",
    leftImg: "left-image.jpg",
    rightImg: "right-image.jpg"
  },
  {
    title: "2016 — First Steps",
    text: "Started school, learned basic skills and sports.",
    leftImg: "left2.jpg",
    rightImg: "right2.jpg"
  }
];

const titleEl = document.getElementById("timelineTitle");
const textEl = document.getElementById("timelineText");
const leftImg = document.getElementById("leftImg");
const rightImg = document.getElementById("rightImg");
const box = document.getElementById("timelineBox");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const newIndex = Number(dot.dataset.index);
    if (newIndex === currentIndex) return;

    const direction = newIndex > currentIndex ? "left" : "right";

    // reset active dot
    dots.forEach(d => d.classList.remove("active"));
    dot.classList.add("active");

    // animation
    box.classList.remove("slide-left", "slide-right");
    void box.offsetWidth; // force reflow
    box.classList.add(direction === "left" ? "slide-left" : "slide-right");

    // đổi data
    titleEl.textContent = data[newIndex].title;
    textEl.textContent = data[newIndex].text;
    leftImg.src = data[newIndex].leftImg;
    rightImg.src = data[newIndex].rightImg;

    currentIndex = newIndex;
  });
});
