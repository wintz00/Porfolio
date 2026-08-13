const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
);

revealElements.forEach((element) => revealObserver.observe(element));

const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');

function applyTheme(theme) {
  const isLight = theme === 'light';
  body.setAttribute('data-theme', theme);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }

  if (themeIcon) {
    themeIcon.textContent = isLight ? '☀️' : '🌙';
  }

  if (themeLabel) {
    themeLabel.textContent = isLight ? 'Light' : 'Dark';
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}