// ═══════════════════════════════════════════════
//  footer.js  —  LearnX Footer JavaScript
// ═══════════════════════════════════════════════

// ── 1. Auto current year ─────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ── 2. Newsletter subscribe ──────────────────────
const newsletterBtn     = document.getElementById('newsletterBtn');
const newsletterEmail   = document.getElementById('newsletterEmail');
const newsletterSuccess = document.getElementById('newsletterSuccess');

if (newsletterBtn) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      newsletterEmail.style.outline = '2px solid #ef4444';
      newsletterEmail.focus();
      setTimeout(() => {
        newsletterEmail.style.outline = '';
      }, 1500);
      return;
    }

    // Success state
    newsletterBtn.textContent      = '✓';
    newsletterBtn.style.background = '#16a34a';
    newsletterEmail.disabled       = true;
    newsletterSuccess.classList.add('show');

    // Reset after 4s
    setTimeout(() => {
      newsletterBtn.textContent      = 'Subscribe';
      newsletterBtn.style.background = '';
      newsletterEmail.value          = '';
      newsletterEmail.disabled       = false;
      newsletterSuccess.classList.remove('show');
    }, 4000);
  });

  // Enter key support
  newsletterEmail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') newsletterBtn.click();
  });
}

// ── 3. Fade in columns on scroll ─────────────────
const footerCols = document.querySelectorAll('.footer-col');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

footerCols.forEach(col => {
  col.style.opacity    = '0';
  col.style.transform  = 'translateY(20px)';
  col.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(col);
});