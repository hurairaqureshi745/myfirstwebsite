// ═══════════════════════════════════════════════
//  enrollment.js  —  LearnX Enrollment Form JS
// ═══════════════════════════════════════════════

// ── Element References ───────────────────────────
const enrollForm  = document.getElementById('enrollForm');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = document.getElementById('btnText');
const btnLoader   = document.getElementById('btnLoader');
const successMsg  = document.getElementById('successMsg');
const enrollAgain = document.getElementById('enrollAgain');
const enrollCard  = document.getElementById('enrollCard');

// ── All fields to validate ───────────────────────
const fields = [
  { id: 'firstName', errId: 'err-firstName', type: 'text'  },
  { id: 'lastName',  errId: 'err-lastName',  type: 'text'  },
  { id: 'email',     errId: 'err-email',     type: 'email' },
  { id: 'phone',     errId: 'err-phone',     type: 'text'  },
  { id: 'course',    errId: 'err-course',    type: 'select'},
  { id: 'schedule',  errId: 'err-schedule',  type: 'select'},
];

// ── 1. Live validation — clear error on input ────
fields.forEach(({ id, errId }) => {
  const input = document.getElementById(id);
  const errEl = document.getElementById(errId);

  if (!input || !errEl) return;

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      input.classList.remove('error');
      errEl.classList.remove('show');
    }
  });

  // For select — listen on change
  input.addEventListener('change', () => {
    if (input.value !== '') {
      input.classList.remove('error');
      errEl.classList.remove('show');
    }
  });
});

// ── 2. Validate single field ─────────────────────
function validateField(fieldObj) {
  const { id, errId, type } = fieldObj;
  const input = document.getElementById(id);
  const errEl = document.getElementById(errId);

  if (!input || !errEl) return true;

  let isValid = true;

  if (type === 'select') {
    isValid = input.value !== '';
  } else if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(input.value.trim());
  } else {
    isValid = input.value.trim() !== '';
  }

  if (!isValid) {
    input.classList.add('error');
    errEl.classList.add('show');
  } else {
    input.classList.remove('error');
    errEl.classList.remove('show');
  }

  return isValid;
}

// ── 3. Validate all fields ───────────────────────
function validateAll() {
  let allValid = true;
  fields.forEach(f => {
    const valid = validateField(f);
    if (!valid) allValid = false;
  });
  return allValid;
}

// ── 4. Show loading state ────────────────────────
function setLoading(state) {
  if (state) {
    btnText.style.display   = 'none';
    btnLoader.style.display = 'inline-block';
    submitBtn.disabled      = true;
  } else {
    btnText.style.display   = 'inline';
    btnLoader.style.display = 'none';
    submitBtn.disabled      = false;
  }
}

// ── 5. Show success message ──────────────────────
function showSuccess() {
  enrollForm.style.display  = 'none';
  successMsg.classList.add('show');

  // scroll card into view
  enrollCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── 6. Reset form ────────────────────────────────
function resetForm() {
  enrollForm.reset();
  fields.forEach(({ id, errId }) => {
    const input = document.getElementById(id);
    const errEl = document.getElementById(errId);
    if (input) input.classList.remove('error');
    if (errEl) errEl.classList.remove('show');
  });
  successMsg.classList.remove('show');
  enrollForm.style.display = 'flex';
  setLoading(false);
}

// ── 7. Form submit ───────────────────────────────
enrollForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate
  const isValid = validateAll();
  if (!isValid) return;

  // Show loader
  setLoading(true);

  // Simulate API call — 1.8s delay
  setTimeout(() => {
    setLoading(false);
    showSuccess();
  }, 1800);
});

// ── 8. Enroll Again button ───────────────────────
enrollAgain.addEventListener('click', resetForm);

// ── 9. Stats counter animation ───────────────────
function animateCounter(el, target, suffix) {
  let current = 0;
  const steps     = 60;
  const duration  = 2000;
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

const statNums = document.querySelectorAll('.istat-num');
let animated   = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      const data = [
        { el: statNums[0], target: 50,  suffix: 'K+' },
        { el: statNums[1], target: 200, suffix: '+'  },
        { el: statNums[2], target: 98,  suffix: '%'  },
      ];
      data.forEach(({ el, target, suffix }) => {
        if (el) animateCounter(el, target, suffix);
      });
    }
  });
}, { threshold: 0.3 });

const section = document.getElementById('enrollment');
if (section) observer.observe(section);