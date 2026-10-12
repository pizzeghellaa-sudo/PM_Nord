(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('#menu-toggle');
  const mainNav = document.querySelector('#navigazione');
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const progress = document.querySelector('#scroll-progress');
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const year = document.querySelector('#current-year');

  // Breakpoint del menu mobile: deve coincidere con la media query in styles.css
  const MOBILE_NAV_MAX = 1050;
  // Sopra questa soglia di scroll (in px) si è ancora nella hero e nessuna voce è attiva
  const HERO_ZONE = 170;

  if (year) year.textContent = String(new Date().getFullYear());

  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Apri menu');
  }

  function toggleMenu() {
    const open = mainNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  }

  menuButton.addEventListener('click', toggleMenu);
  mainNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!mainNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_NAV_MAX && mainNav.classList.contains('is-open')) closeMenu();
  }, { passive: true });

  let scheduled = false;
  function updateScrollUI() {
    scheduled = false;
    const y = window.scrollY || document.documentElement.scrollTop;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? Math.max(0, Math.min(1, y / total)) : 0})`;
    header.classList.toggle('is-scrolled', y > 12);

    const line = header.getBoundingClientRect().height + window.innerHeight * .30;
    let activeId = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) activeId = section.id;
    }
    if (y < HERO_ZONE) activeId = null;
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function requestScrollUpdate() {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  }
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  window.addEventListener('load', updateScrollUI);
  window.addEventListener('hashchange', requestScrollUpdate);
  updateScrollUI();
})();
