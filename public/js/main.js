let WHATSAPP_NUMBER = '8801787341058';

function waLink(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(function (a) {
  a.addEventListener('click', function () {
    if (navLinks) navLinks.classList.remove('open');
  });
});

function observeReveals() {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
    revealObserver.observe(el);
  });
}

function initFilters() {
  document.querySelectorAll('.filter-bar .filter-btn').forEach(function (btn) {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-bar .filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.gallery-item').forEach(function (item) {
        item.classList.toggle('hidden', filter !== 'all' && !item.classList.contains('cat-' + filter));
      });
    });
  });
}

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

observeReveals();
initFilters();
