// ═══════════════════════════════════════════════
//  home.js  —  LearnX Courses Section JavaScript
// ═══════════════════════════════════════════════

// ── Scroll reveal animation for cards ───────────
const cards = document.querySelectorAll('.course-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});