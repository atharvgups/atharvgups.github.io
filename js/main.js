(function() {
  'use strict';

  // ----- Theme (persisted, defaults to dark) -----
  let root = document.body;
  let stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (e) {
    stored = null;
  }
  if (stored === 'light') {
    root.classList.add('light');
  }

  let themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      let isLight = root.classList.toggle('light');
      try {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      } catch (e) {}
    });
  }

  // ----- Sticky nav shadow on scroll -----
  let nav = document.getElementById('nav');
  let topButton = document.getElementById('top-button');

  function onScroll() {
    let y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) {
      nav.classList.toggle('scrolled', y > 40);
    }
    if (topButton) {
      topButton.classList.toggle('show', y > 600);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu -----
  let burger = document.getElementById('nav-burger');
  let overlay = document.getElementById('nav-overlay');
  let navLinks = document.getElementById('nav-links');

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (!nav) return;
    let open = nav.classList.toggle('menu-open');
    document.body.classList.toggle('menu-open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (burger) burger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  if (navLinks) {
    let anchors = navLinks.querySelectorAll('a');
    for (let i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', closeMenu);
    }
  }

  // ----- Back to top -----
  if (topButton) {
    topButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Scroll reveal via IntersectionObserver -----
  let revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    for (let j = 0; j < revealEls.length; j++) {
      observer.observe(revealEls[j]);
    }
  } else {
    for (let k = 0; k < revealEls.length; k++) {
      revealEls[k].classList.add('in-view');
    }
  }

  // ----- Active nav link highlighting -----
  let sections = document.querySelectorAll('section[id]');
  let linkMap = {};
  if (navLinks) {
    let allLinks = navLinks.querySelectorAll('a[href^="#"]');
    for (let l = 0; l < allLinks.length; l++) {
      linkMap[allLinks[l].getAttribute('href').slice(1)] = allLinks[l];
    }
  }
  if ('IntersectionObserver' in window && sections.length) {
    let spy = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          let link = linkMap[entry.target.id];
          if (link && entry.isIntersecting) {
            for (let key in linkMap) {
              if (linkMap.hasOwnProperty(key))
                linkMap[key].classList.remove('is-active');
            }
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (let m = 0; m < sections.length; m++) {
      spy.observe(sections[m]);
    }
  }
})();
