/* Page interactions: scroll reveal and active nav highlight. */
(function () {
  'use strict';

  /* 1. Scroll reveal — the class is added by JS so content stays visible when JS is unavailable */
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* 2. Highlight the nav link for the section currently in view */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var navSections = navLinks.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  if (navSections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    navSections.forEach(function (section) { spy.observe(section); });
  }
})();
