// ═══════════════════════════════════════════════
//  hero.js  —  LearnX Hero Section JavaScript
// ═══════════════════════════════════════════════

// ── Element References ───────────────────────────
const heroEnrollBtn = document.getElementById('heroEnrollBtn');
const heroBrowseBtn = document.getElementById('heroBrowseBtn');

// ── 1. Get Started Free — open enrollment modal ──
heroEnrollBtn.addEventListener('click', () => {
  // Jab index.html mein sab link ho ga to ye modal kholega
  if (typeof openModal === 'function') {
    openModal();
  } else {
    // Placeholder jab tak sab link na ho
    alert('Enrollment form coming soon!');
  }
});

// ── 2. Browse Courses — scroll to courses section ─
heroBrowseBtn.addEventListener('click', () => {
  const coursesSection = document.getElementById('courses');
  if (coursesSection) {
    coursesSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    alert('Courses section coming soon!');
  }
});

// ── 3. Stats Counter Animation ───────────────────
function animateCounter(el, target, suffix) {
  let current = 0;
  const steps    = 60;
  const duration = 2000;
  const increment = target / steps;
  const interval  = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, interval);
}

// Start counter when hero is visible
const statsNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;

      const data = [
        { el: statsNumbers[0], target: 50,  suffix: 'K+' },
        { el: statsNumbers[1], target: 200, suffix: '+'  },
        { el: statsNumbers[2], target: 98,  suffix: '%'  },
      ];

      data.forEach(({ el, target, suffix }) => {
        if (el) animateCounter(el, target, suffix);
      });
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('home');
if (heroSection) observer.observe(heroSection);