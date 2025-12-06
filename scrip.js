/* NIGHT MODE */
const moon = document.querySelector('.moon');
const stars = [];
for (let i = 0; i < 80; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';
  document.body.appendChild(star);
  stars.push(star);
}

function toggleMode() {
  document.body.classList.toggle("night");
  const night = document.body.classList.contains("night");
  moon.style.display = night ? "block" : "none";
  stars.forEach(star => star.style.display = night ? "block" : "none");
}

/* ENVELOPE COVER REMOVE AFTER ANIMATION */
window.addEventListener("load", () => {
  const envelope = document.getElementById("envelope");
  setTimeout(() => {
    envelope.style.display = "none";
  }, 2000); // match animation duration
});

/* SLIDER */
let slideIndex = 0;
const slides = document.querySelectorAll(".slider img");
setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 2000);

/* HEART GAME */
let score = 0;
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "popup-heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.bottom = "0px";
  heart.onclick = () => {
    score++;
    document.getElementById("score").innerText = score;
    heart.remove();
  };
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

/* SURPRISE */
function showLove() {
  document.getElementById("surprise").style.display = "block";
}

/* AFFIRMATIONS */
const compliments = [
  "You are stronger than you know 💪",
  "You survived things you once thought you couldn't 🌻",
  "You are growing beautifully 🌸",
  "You deserve every soft and happy thing ✨",
  "Your heart is rare and powerful 💖",
  "You should be proud of yourself today & always 👑",
  "You are enough, just as you are 🌈",
  "You are the most amazing person I know 🌟",
];
function newCompliment() {
  let text = compliments[Math.floor(Math.random()*compliments.length)];
  document.getElementById("complimentBox").innerText = text;
}

/* CONFETTI */
function createConfetti() {
  for (let i = 0; i < 80; i++) {
    let conf = document.createElement("div");
    conf.style.position = "fixed";
    conf.style.width = "8px";
    conf.style.height = "8px";
    conf.style.background = `hsl(${Math.random()*360},100%,50%)`;
    conf.style.left = Math.random() * window.innerWidth + "px";
    conf.style.top = "-10px";
    conf.style.opacity = "0.8";
    document.body.appendChild(conf);
    conf.animate([
      { transform: 'translateY(0)' },
      { transform: `translateY(${window.innerHeight + 100}px)` }
    ], {
      duration: Math.random() * 2000 + 2000,
      easing: "ease-out"
    });
    setTimeout(() => conf.remove(), 3000);
  }
}

const audio = document.getElementById("birthdayAudio");
const playBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const time = document.getElementById("time");

playBtn.addEventListener("click", () => {
  if(audio.paused){
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  let mins = Math.floor(audio.currentTime / 60);
  let secs = Math.floor(audio.currentTime % 60);
  if(secs < 10) secs = "0" + secs;
  time.textContent = `${mins}:${secs}`;
});

// Seek audio
document.querySelector(".progress-container").addEventListener("click", e => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

const bgMusic = document.getElementById("bgMusic");
const voiceAudio = document.getElementById("birthdayAudio");

// Set initial background music volume low
bgMusic.volume = 0.15;

// Auto-play background music after user interaction (required by most browsers)
window.addEventListener("click", () => {
  if(bgMusic.paused){
    bgMusic.play().catch(()=>{}); // avoids autoplay errors
  }
}, {once:true});

// Lower background music when voice plays
voiceAudio.addEventListener("play", () => {
  fadeVolume(bgMusic, 0.05, 500); // reduce volume to 0.05 over 0.5s
});

// Restore background music after voice ends
voiceAudio.addEventListener("ended", () => {
  fadeVolume(bgMusic, 0.15, 1000); // back to 0.15 over 1s
});

// Utility function to fade volume smoothly
function fadeVolume(audio, targetVolume, duration) {
  const stepTime = 50; // ms
  const steps = duration / stepTime;
  const volumeStep = (targetVolume - audio.volume) / steps;
  let i = 0;

  const fade = setInterval(() => {
    if(i < steps){
      audio.volume = Math.min(Math.max(audio.volume + volumeStep, 0), 1);
      i++;
    } else {
      clearInterval(fade);
    }
  }, stepTime);
}

// Optional: auto-play voice when envelope opens
window.addEventListener("load", () => {
  setTimeout(() => {
    voiceAudio.play().catch(()=>{});
  }, 2000); // after envelope animation
});
