const floatingWords = document.getElementById('floatingWords');
const sparkles = document.getElementById('sparkles');
const wishText = document.getElementById('wishText');
const openMessage = document.getElementById('openMessage');
const nextWish = document.getElementById('nextWish');

const words = ['cimel', 'birthday girl', 'pretty', 'love', 'sweet', 'soft', 'special', 'shine', 'lovely', 'dear'];
const wishes = [
  'semoga hari-harimu selalu ditemenin hal-hal baik, hati yang tenang, dan kebahagiaan yang nggak capek nyamperin kamu.',
  'semoga semua doa baik pelan-pelan nemuin jalannya ke kamu, satu per satu, dengan cara yang paling indah.',
  'semoga ulang tahun ini jadi awal dari lebih banyak senyum, lebih banyak hal manis, dan lebih banyak momen yang bikin kamu ngerasa dicintai.',
  'semoga kamu selalu sehat, selalu dijaga, dan tetap jadi cimel yang bikin dunia terasa lebih hangat.'
];
let wishIndex = 0;

function createWord() {
  const el = document.createElement('span');
  el.className = 'word';
  el.textContent = words[Math.floor(Math.random() * words.length)];
  el.style.left = `${Math.random() * 100}%`;
  el.style.animationDuration = `${7 + Math.random() * 5}s`;
  el.style.opacity = `${0.16 + Math.random() * 0.18}`;
  floatingWords.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}

function createSpark() {
  const el = document.createElement('span');
  el.className = 'spark';
  el.style.left = `${Math.random() * 100}%`;
  el.style.top = `${Math.random() * 100}%`;
  sparkles.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

setInterval(createWord, 900);
setInterval(createSpark, 300);
for (let i = 0; i < 8; i++) {
  setTimeout(createWord, i * 250);
}

openMessage.addEventListener('click', () => {
  wishText.textContent = wishes[0];
});

nextWish.addEventListener('click', () => {
  wishIndex = (wishIndex + 1) % wishes.length;
  wishText.textContent = wishes[wishIndex];
});
