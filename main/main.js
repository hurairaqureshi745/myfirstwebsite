// LearnX combined landing page JavaScript

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobLinks = document.querySelectorAll('.mob-link');
const enrollLinks = document.querySelectorAll('a[href="#enrollment"]');

function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

function closeMobileMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

mobLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

enrollLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    closeMobileMenu();
    scrollToSection('#enrollment');
  });
});

const heroEnrollBtn = document.getElementById('heroEnrollBtn');
const heroBrowseBtn = document.getElementById('heroBrowseBtn');

if (heroEnrollBtn) {
  heroEnrollBtn.addEventListener('click', () => scrollToSection('#enrollment'));
}

if (heroBrowseBtn) {
  heroBrowseBtn.addEventListener('click', () => scrollToSection('#courses'));
}

function animateNumber(el, target, suffix) {
  let current = 0;
  const steps = 60;
  const increment = target / steps;
  const interval = 2000 / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, interval);
}

function animateStatsWhenVisible(sectionSelector, numberSelector, data) {
  const section = document.querySelector(sectionSelector);
  const numbers = document.querySelectorAll(numberSelector);
  let hasAnimated = false;

  if (!section || !numbers.length) return;

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        data.forEach(({ index, target, suffix }) => {
          if (numbers[index]) animateNumber(numbers[index], target, suffix);
        });
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(section);
}

animateStatsWhenVisible('#home', '.stat-number', [
  { index: 0, target: 50, suffix: 'K+' },
  { index: 1, target: 200, suffix: '+' },
  { index: 2, target: 98, suffix: '%' },
]);

animateStatsWhenVisible('#enrollment', '.istat-num', [
  { index: 0, target: 50, suffix: 'K+' },
  { index: 1, target: 200, suffix: '+' },
  { index: 2, target: 98, suffix: '%' },
]);

const courseCards = document.querySelectorAll('.course-card');
if (courseCards.length) {
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  courseCards.forEach(card => {
    card.style.animationPlayState = 'paused';
    cardObserver.observe(card);
  });
}

const enrollForm = document.getElementById('enrollForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const successMsg = document.getElementById('successMsg');
const enrollAgain = document.getElementById('enrollAgain');
const enrollCard = document.getElementById('enrollCard');

const fields = [
  { id: 'firstName', errId: 'err-firstName', type: 'text' },
  { id: 'lastName', errId: 'err-lastName', type: 'text' },
  { id: 'email', errId: 'err-email', type: 'email' },
  { id: 'phone', errId: 'err-phone', type: 'text' },
  { id: 'course', errId: 'err-course', type: 'select' },
  { id: 'schedule', errId: 'err-schedule', type: 'select' },
];

function validateField(field) {
  const input = document.getElementById(field.id);
  const error = document.getElementById(field.errId);
  if (!input || !error) return true;

  let isValid = true;
  if (field.type === 'select') {
    isValid = input.value !== '';
  } else if (field.type === 'email') {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  } else {
    isValid = input.value.trim() !== '';
  }

  input.classList.toggle('error', !isValid);
  error.classList.toggle('show', !isValid);
  return isValid;
}

function validateAllFields() {
  let isValid = true;
  fields.forEach(field => {
    if (!validateField(field)) isValid = false;
  });
  return isValid;
}

function setEnrollmentLoading(isLoading) {
  if (!submitBtn || !btnText || !btnLoader) return;

  btnText.style.display = isLoading ? 'none' : 'inline';
  btnLoader.style.display = isLoading ? 'inline-block' : 'none';
  submitBtn.disabled = isLoading;
}

function showEnrollmentSuccess() {
  if (enrollForm) enrollForm.style.display = 'none';
  if (successMsg) successMsg.classList.add('show');
  if (enrollCard) enrollCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetEnrollmentForm() {
  if (enrollForm) {
    enrollForm.reset();
    enrollForm.style.display = 'flex';
  }

  fields.forEach(({ id, errId }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errId);
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('show');
  });

  if (successMsg) successMsg.classList.remove('show');
  setEnrollmentLoading(false);
}

fields.forEach(({ id, errId }) => {
  const input = document.getElementById(id);
  const error = document.getElementById(errId);
  if (!input || !error) return;

  ['input', 'change'].forEach(eventName => {
    input.addEventListener(eventName, () => {
      if (input.value.trim() !== '') {
        input.classList.remove('error');
        error.classList.remove('show');
      }
    });
  });
});

if (enrollForm) {
  enrollForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateAllFields()) return;

    setEnrollmentLoading(true);
    setTimeout(() => {
      setEnrollmentLoading(false);
      showEnrollmentSuccess();
    }, 1800);
  });
}

if (enrollAgain) {
  enrollAgain.addEventListener('click', resetEnrollmentForm);
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const newsletterBtn = document.getElementById('newsletterBtn');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterSuccess = document.getElementById('newsletterSuccess');

function submitNewsletter() {
  if (!newsletterBtn || !newsletterEmail || !newsletterSuccess) return;

  const email = newsletterEmail.value.trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    newsletterEmail.style.outline = '2px solid #ef4444';
    newsletterEmail.focus();
    setTimeout(() => {
      newsletterEmail.style.outline = '';
    }, 1500);
    return;
  }

  newsletterBtn.textContent = '✓';
  newsletterBtn.style.background = '#16a34a';
  newsletterEmail.disabled = true;
  newsletterSuccess.classList.add('show');

  setTimeout(() => {
    newsletterBtn.textContent = 'Subscribe';
    newsletterBtn.style.background = '';
    newsletterEmail.value = '';
    newsletterEmail.disabled = false;
    newsletterSuccess.classList.remove('show');
  }, 4000);
}

if (newsletterBtn) {
  newsletterBtn.addEventListener('click', submitNewsletter);
}

if (newsletterEmail) {
  newsletterEmail.addEventListener('keydown', event => {
    if (event.key === 'Enter') submitNewsletter();
  });
}

const footerCols = document.querySelectorAll('.footer-col');
if (footerCols.length) {
  const footerObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        footerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  footerCols.forEach(col => {
    col.style.opacity = '0';
    col.style.transform = 'translateY(20px)';
    col.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    footerObserver.observe(col);
  });
}
