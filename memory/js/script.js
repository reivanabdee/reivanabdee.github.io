// ============================================
// FLOATING HEARTS
// ============================================
(function() {
  const heartsContainer = document.getElementById('hearts');
  const heartChars = ['♥', '♡', '❤', '💕', '💗'];
  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (10 + Math.random() * 18) + 'px';
    heart.style.color = `rgba(212, 93, 121, ${0.2 + Math.random() * 0.3})`;
    heart.style.animationDuration = (10 + Math.random() * 18) + 's';
    heart.style.animationDelay = Math.random() * 12 + 's';
    heartsContainer.appendChild(heart);
  }
})();

// ============================================
// COUNTER — Days since 28 Maret 2026
// ============================================
(function() {
  const startDate = new Date('2026-03-28T00:00:00');

  function update() {
    const now = new Date();
    const diff = now - startDate;
    if (diff < 0) {
      // Future date (not yet reached)
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      return;
    }
    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  update();
  setInterval(update, 1000);
})();

// ============================================
// SCROLL REVEAL
// ============================================
(function() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger reveal across multiple items in the same viewport
        const delay = (idx % 4) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// MUSIC PLAYER (YouTube iframe API)
// ============================================
(function() {
  const btn = document.getElementById('musicBtn');
  const iconPlay = btn.querySelector('.icon-play');
  const iconPause = btn.querySelector('.icon-pause');
  const frame = document.getElementById('ytFrame');
  let isPlaying = false;
  let ytPlayer = null;
  let ready = false;

  // Load YouTube IFrame API
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('ytFrame', {
      events: {
        onReady: () => { ready = true; }
      }
    });
  };

  function post(action) {
    if (ytPlayer && ready) {
      ytPlayer.postMessage(JSON.stringify({
        event: 'command',
        func: action
      }), '*');
    }
  }

  btn.addEventListener('click', () => {
    if (!ready) return;
    if (isPlaying) {
      post('pauseVideo');
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    } else {
      post('playVideo');
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    }
    isPlaying = !isPlaying;
  });
})();

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
(function() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.style.boxShadow = '0 2px 12px rgba(212,93,121,0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
    lastScroll = window.scrollY;
  });
})();
