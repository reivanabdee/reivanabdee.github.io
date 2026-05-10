const slides = [...document.querySelectorAll('.slide')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const starfield = document.getElementById('starfield');
let current = 0;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  navLinks.forEach((link, i) => link.classList.toggle('active', i === current));
}

navLinks.forEach((link, i) => {
  link.addEventListener('click', () => showSlide(i));
});

nextBtn.addEventListener('click', () => showSlide(current + 1));
prevBtn.addEventListener('click', () => showSlide(current - 1));

let touchStartX = 0;
let touchEndX = 0;
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) > 50) {
    delta < 0 ? showSlide(current + 1) : showSlide(current - 1);
  }
});

function createStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.top = `${Math.random() * 70}%`;
  star.style.left = `${50 + Math.random() * 45}%`;
  star.style.opacity = '0';
  star.style.animationDuration = `${1.8 + Math.random() * 2.4}s`;
  starfield.appendChild(star);
  setTimeout(() => star.remove(), 4500);
}

setInterval(createStar, 1200);
for (let i = 0; i < 5; i++) {
  setTimeout(createStar, i * 500);
}
