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
      showItem(currentIndex + 1, "next");
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      showItem(currentIndex - 1, "prev");
    }
  });

  showItem(0);
});
//Translation
const translations = {
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_about: "About",
    Nov2010: "<h2>1/11/2010 - Spawned</h2><p>6:00 a.m. I got spawned into this world. According to my mom, everything went smoothly. As for me? I had absolutely no idea what was going on. </p></div>",
    Year2013: "<h2>2013-First Achievement</h2><p>This year I unlocked some starter abilities: standing, walking, and saying a few Vietnamese words like Mom, Dad, and Hi. Basically, the demo version of a human was finally playable. </p></div>",
    Year2015: "<h2>2015-First Day of School (Not That Fun)</h2><p>I started kindergarten. Sounds cute. The experience was not. I got bullied, was weak both physically and mentally. Looking back now, yeah… this was probably where my first emotional scratches showed up</p></div>",
    Year2016: "<h2>2016-First Bestie Unlocked</h2><p>I met my very first friend in class 1A2 at Dao Phuc Loc Primary School. His name was Trong. Because of him, I became less introverted, less afraid of people, and slowly started “unlocking” the outside world. A small moment, but a big turning point.</p></div>",
    Year2018: "<h2>2018-My Companion</h2><p>This year I got hit with gastritis. Sounds minor. It wasn’t. Weak, overweight, constantly tired, taking meds every day, vomiting whenever stress kicked in — full debuff package. This was the year I learned that your body and mind can absolutely turn against you.</p></div>",
    Year2020: "<h2>2020-First Crush</h2><p>This was the first time I realized what it meant to like someone. Her name was T*** She was the kind of pretty that made everyone fall instantly. Me and another guy (H**) were both simping hard. We even had serious discussions about her hobbies and jokingly imagined marrying her someday😹.Looking back, it was childish and dumb — but the memory still hits.</p></div>",
    Juneof2024: "<h2>6/2024-The One That Changed Everything</h2><p >On June 4th, 2024, I realized I was studying next to someone who felt… different. Sorry if you’re reading this, but your name deserves to be here: Đỗ Phạm Phương Anh. She’s beautiful, smart, and feels like she was born with built-in buffs. Always top of the class, ranked third in the high school entrance exam. Quiet, a small group of her bestfriend — but her vibe? Extremely chill and socializing. I built a website for her 15th birthday — my first web project ever. After everything, I still have to admit it: I still respect her.</p></div>",
    Juneof2025: "<h2>6/2025-Confession</h2><p>. In May 2025, I did something pretty unhinged: I confessed. Result? Rejected 😭. That day was terrifyingly quiet. That same year, I passed the high school entrance exam, ranking 73rd out of 495. Not bad — but not excellent either. And in my head, I was wondering myself: Was I just… not good enough to love Phuong Anh?</p></div>",
    Julyof2025: "<h2>7/2025-Mindset has changed</h2><p>Only two months — but enough to change a lot. In July, me and my closest friends(Le Bao Nam, Doan Minh Son, Nguyen Minh Tien, Nguyen Huu Chuong) were basically glued together: movie theaters, eating out, gaming from morning till midnight. Most importantly, we started playing basketball. My first sport ever that I took seriously. Painful. Exhausting. Addictive. Around the same time, I started learning web development. And yeah — my first project was for Phương Anh. Coding was rough, Python was stressful, but finishing it made me feel like I’d leveled up. By August, we were playing 3v3 and 1v1. The strongest player on the team was Chuong — not just because of skill, but because he always pushed everyone else to improve. They weren’t just teammates. They were the people who pulled me back whenever my mood completely crashed. Funny, kind, and genuinely real </p> </div>",
    Septemberof2025: "<h2>9/2025-First Day of High School </h2><p>In September, all of us entered class 10A5 at Tran Phu High School. On September 5th, the team officially got a name: Hạc Sẹo — a name that literally means nothing. And that’s exactly why it's hilarious. Not long after, we even went to watch Red Rain with our new classmates. I and my new classmates had known each other for exactly three days, yet there we were, sitting in the same cinema like we’d been friends before.</p></div>",
    Decemberof2025: "<h2>12/2025-REVOLUTION</h2> <p>In December, we continued our basketball journey. The team was growing stronger, and so were we. We started training more seriously, with Chuong leading the way. We participated in a school tournament and made it to the final. We won the tournament, defeated a 12nd grade team in the final game.</p>",
  },

  vi: {
    nav_home: "Trang chủ",
    nav_projects: "Các dự án",
    nav_contact: "Liên hệ",
    nav_about: "Giới thiệu",
    Nov2010: "<h2>1/11/2010 - Được sinh ra</h2><p>6 giờ sáng. Tớ được sinh ra vào thế giới này. Theo lời mẹ kể thì mọi thứ diễn ra khá suôn sẻ. Còn mình thì… chưa kịp hiểu chuyện gì đang xảy ra.</p></div>",
    Year2013: "<h2>2013-Thành tựu đạt được đầu tiên</h2><p>Năm này mình mở khóa được một số kỹ năng cơ bản: biết đứng, biết đi, và nói được vài từ tiếng Việt như Mẹ, Bố, và Chào. Về cơ bản thì phiên bản demo của con người cuối cùng cũng có thể chơi được rồi.</p></div>",
    Year2015: "<h2>2015-Ngày đầu tiên đi học(Không vui lắm)</h2><p>Mình bắt đầu đi học mẫu giáo. Nghe thì cute đấy. Thực tế thì không hề vậy. Mình bị bắt nạt, yếu cả thể chất lẫn tinh thần. Nhìn lại bây giờ, có lẽ… đây là lúc những vết xước cảm xúc đầu tiên của mình xuất hiện.</p></div>",
    Year2016: "<h2>2016-Mối quan hệ bạn bè đầu tiên</h2><p>Mình gặp người bạn đầu tiên trong lớp 1A2 trường Tiểu học Đào Phúc Lộc. Bạn ấy tên Trọng. Nhờ có bạn ấy mà mình trở nên bớt hướng nội hơn, bớt sợ người lạ hơn, và dần dần bắt đầu cởi mở với thế giới bên ngoài. Một khoảnh khắc nhỏ, nhưng là bước ngoặt lớn.</p></div>",
    Year2018: "<h2>2018-Người bạn đồng hành</h2><p>Năm này mình bị viêm dạ dày. Nghe thì có vẻ nhẹ nhàng đấy. Nhưng không phải vậy. Mình yếu ớt, thừa cân vì bị ép ăn, luôn mệt mỏi, phải uống thuốc mỗi ngày, và cứ căng thẳng là nôn mửa — đầy đủ các gói debuff sức khỏe. Đây là năm mình nhận ra rằng cơ thể và tâm trí của bạn hoàn toàn có thể chống lại chính mình.</p></div>",
    Year2020: "<h2>2020-Lần yêu đầu tiên</h2><p>Đây là lần đầu tiên mình nhận ra thế nào là thích một ai đó. Cô ấy tên T*** Cô ấy là kiểu xinh đẹp khiến ai cũng phải đổ gục ngay lập tức. Mình và một cậu bạn khác (H**) đều đang “tán phét” về cô ấy rất nhiều. Chúng mình thậm chí còn có những cuộc nói chuyện về sở thích của cô ấy và đùa rằng sẽ kết hôn với cô ấy một ngày nào đó😹. Nhìn lại thì thật trẻ con và ngớ ngẩn — nhưng ký ức đó vẫn khiến mình rung động.</p></div>",
    Juneof2024: "<h2>6/2024-Người khiến mình thay đổi</h2><p>Vào ngày 4 tháng 6 năm 2024, mình nhận ra mình đang học cạnh một người có cảm giác… khác biệt. Xin lỗi nếu cậu đọc được cái này, nhưng tên của cậu xứng đáng được nhắc đến ở đây: Đỗ Phạm Phương Anh. Cô ấy xinh, thông minh, học giỏi như con nhà người ta. Luôn đứng đầu lớp, xếp thứ ba trong kỳ thi tuyển sinh vào cấp ba. Tính cách khá yên tĩnh, có một nhóm bạn thân nhỏ  — nhưng vibe của cô ấy? Cực kỳ chill và hòa đồng. Mình đã xây dựng một trang web cho sinh nhật lần thứ 15 của cô ấy — dự án web đầu tiên của mình. Sau tất cả, mình vẫn phải thừa nhận rằng: mình vẫn còn tôn trọng cô ấy.</p></div>",
    Juneof2025: "<h2>6/2025-Tỏ tình</h2><p>Tháng 5 năm 2025, mình đã làm một việc khá liều lĩnh: tỏ tình. Kết quả? Bị từ chối 😭. Ngày hôm đó yên tĩnh đến đáng sợ. Cùng năm đó, mình đỗ vào lớp 10, xếp thứ 73 trên tổng số 495 thí sinh.Không tệ — nhưng cũng không xuất sắc.Và trong đầu mình, mình đã tự hỏi bản thân: Mình có phải… không đủ tốt để được Phương Anh yêu không?</p></div>",
    Julyof2025: "<h2>7/2025-Thay đổi Mindset</h2><p>Chỉ hai tháng thôi — nhưng đủ để thay đổi rất nhiều thứ. Vào tháng 7, mình và những người bạn thân nhất(Lê Bảo Nam, Đoàn Minh Sơn, Nguyễn Minh Tiến, Nguyễn Hữu Chương) gần như dính chặt lấy nhau:Xem phim,ăn uống,chơi game từ sáng đến tối.Quan trọng nhất là mình bắt đầu chơi bóng rổ-môn thể thao đầu tiên mà mình thực sự nghiêm túc theo đuổi.Đau đớn,mệt mỏi,nhưng lại gây nghiện.Cùng khoảng thời gian đó, mình bắt đầu học phát triển web.Và đúng vậy — dự án đầu tiên của mình là dành cho Phương Anh.Lập trình và viết code khó lắm, nhưng hoàn thành nó khiến mình cảm thấy như đã lên trình.Đến tháng 8, nhóm chúng mình đã biết cách chơi 3v3 và 1v1.Người chơi giỏi nhất trong đội là Chương — không chỉ vì kỹ năng, mà còn vì cậu ấy luôn thúc đẩy mọi người khác tiến bộ theo.Họ không chỉ là anh em,họ là những người kéo tớ trở lại mỗi khi tâm trạng của tớ sụp đổ hoàn toàn.Vui tính,tốt bụng,và sống thật</p> </div>",
    Septemberof2025: "<h2>9/2025-Bước vào cấp 3 </h2><p>Trong tháng 9, tất cả chúng mình đều được học cùng lớp 10A5 của trường THPT Trần Phú. Vào ngày 5 tháng 9, nhóm của chúng mình chính thức có tên: Hạc Sẹo — một cái tên không có nghĩa gì cả. Và đó chính là lý do nó lại hài hước. Không lâu sau đó, chúng mình thậm chí còn đi xem phim Mưa Đỏ cùng những bạn mới quen. Mình và các bạn trong lớp mới biết nhau đúng ba ngày, nhưng ở đó, chúng mình ngồi trong rạp chiếu phim như thể đã là bạn bè từ lâu.</p></div>",
    Decemberof2025: "<h2>12/2025-ĐỔI MỚI</h2> <p>Trong tháng 12, chúng mình tiếp tục hành trình chơi bóng rổ. Đội bóng rổ Hạc Sẹo ngày càng mạnh mẽ, và chúng mình cũng vậy. Chúng mình bắt đầu tập luyện nghiêm túc hơn, với Chương là người lãnh đạo anh em. Chúng mình tham gia một giải đấu trường học và tiến đến vòng chung kết. Chúng mình giành chức vô địch trong giải đấu, đánh bại 1 đội lớp 12 trong trận chung kết.</p>",
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

// Hamburger Menu
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}
// Timeline Animation
let items;
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  items = document.querySelectorAll(".timeline-item");
  showItem(0, "init");
});

function showItem(index, direction = "next") {
  if (index === currentIndex) return;

  const current = items[currentIndex];
  const next = items[index];

  // reset trạng thái
  items.forEach(item => {
    item.classList.remove("active", "exit");
  });

  // setup vị trí ban đầu cho item mới
  next.style.transition = "none";
  next.style.opacity = "0";

  if (direction === "next") {
    next.style.transform = "translate(40px, -40px) rotate(-6deg) scale(0.96)";
  } else {
    next.style.transform = "translate(-40px, -40px) rotate(6deg) scale(0.96)";
  }

  next.offsetHeight; // force reflow
  next.style.transition = "";

  // animate
  current?.classList.add("exit");
  next.classList.add("active");

  currentIndex = index;
}
const unlockBtn = document.getElementById("unlockTimelineBtn");
const passwordInput = document.getElementById("timelinePassword");
const lockOverlay = document.getElementById("timelineLock");
const errorText = document.getElementById("timelineError");

unlockBtn.addEventListener("click", () => {
  if (passwordInput.value === "JaMorantSigma67") { // đổi pass ở đây
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