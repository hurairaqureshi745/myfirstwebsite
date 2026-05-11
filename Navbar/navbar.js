// ═══════════════════════════════════════════════
//  navbar.js  —  LearnX Navbar JavaScript
// ═══════════════════════════════════════════════

// ── Element References ───────────────────────────
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const enrollBtn   = document.getElementById('enrollBtn');
const mobEnrollBtn= document.getElementById('mobEnrollBtn');
const enrollModal = document.getElementById('enrollModal');
const modalClose  = document.getElementById('modalClose');
const navLinks    = document.querySelectorAll('.nav-link');
const mobLinks    = document.querySelectorAll('.mob-link');

// ── 1. Scroll — navbar shadow effect ────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── 2. Hamburger — open/close mobile menu ───────
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── 3. Active nav link on click ──────────────────
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ── 4. Open Enrollment Modal ─────────────────────
function openModal() {
  enrollModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Enroll button — desktop
enrollBtn.addEventListener('click', openModal);

// Enroll button — mobile
mobEnrollBtn.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  openModal();
});

// ── 5. Close Enrollment Modal ────────────────────
function closeModal() {
  enrollModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close button inside modal
modalClose.addEventListener('click', closeModal);

// Click outside modal box to close
enrollModal.addEventListener('click', (e) => {
  if (e.target === enrollModal) {
    closeModal();
  }
});

// Press Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ── 6. Form Submit ───────────────────────────────
const submitBtn = document.querySelector('.btn-submit');

submitBtn.addEventListener('click', () => {
  const inputs  = enrollModal.querySelectorAll('input');
  const select  = enrollModal.querySelector('select');
  let   allFilled = true;

  // Simple validation — check empty fields
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      input.style.borderColor = '#e53e3e';
      allFilled = false;
    } else {
      input.style.borderColor = '#1a73e8';
    }
  });

  if (select.value === '') {
    select.style.borderColor = '#e53e3e';
    allFilled = false;
  } else {
    select.style.borderColor = '#1a73e8';
  }

  if (allFilled) {
    submitBtn.textContent = '✓ Enrollment Submitted!';
    submitBtn.style.background = '#16a34a';

    setTimeout(() => {
      closeModal();
      // Reset form
      inputs.forEach(input => {
        input.value = '';
        input.style.borderColor = '';
      });
      select.value = '';
      select.style.borderColor = '';
      submitBtn.textContent = 'Submit Enrollment';
      submitBtn.style.background = '';
    }, 1800);
  }
});