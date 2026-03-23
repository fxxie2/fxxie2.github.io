/* ============================================
   Fengze Xie - Academic Website
   JavaScript: GSAP animations, nav, video control
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll styling (Step 16) ---
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      });
    });
  }

  // --- Active nav link on scroll (Step 16) ---
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const setActive = () => {
    const scrollY = window.scrollY + 120;
    let currentId = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        currentId = sec.id;
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // --- Video start time from data-start attribute ---
  const videos = document.querySelectorAll('.project-media video');
  videos.forEach(v => {
    const startTime = parseFloat(v.dataset.start);
    if (startTime) {
      v.currentTime = startTime;
      v.addEventListener('loadedmetadata', () => { v.currentTime = startTime; }, { once: true });
    }
  });

  // --- Lazy video play/pause on visibility ---
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.2 });
  videos.forEach(v => videoObserver.observe(v));

  // --- GSAP + ScrollTrigger Animations (Step 15) ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero: staggered fade-in on page load
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    heroTl
      .from('.hero-photo img', { opacity: 0, scale: 0.9, duration: 1 })
      .from('.hero-text h1', { y: 30, opacity: 0 }, '-=0.6')
      .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.5')
      .from('.hero-affiliation', { y: 20, opacity: 0 }, '-=0.4')
      .from('.hero-bio', { y: 20, opacity: 0, stagger: 0.15 }, '-=0.3')
      .from('.hero-links', { y: 20, opacity: 0 }, '-=0.2');

    // Section headings: fade up on scroll
    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Project cards: staggered reveal
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        y: 60, opacity: 0, duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' }
      });
    });

    // Education items: staggered from left
    gsap.utils.toArray('.edu-item').forEach((item, i) => {
      gsap.from(item, {
        x: -40, opacity: 0, duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%' }
      });
    });

    // Teaching cards: scale in
    gsap.utils.toArray('.teaching-card').forEach((card, i) => {
      gsap.from(card, {
        y: 40, opacity: 0, scale: 0.95, duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' }
      });
    });

    // Award items: stagger
    gsap.utils.toArray('.award-item').forEach((item, i) => {
      gsap.from(item, {
        x: 30, opacity: 0, duration: 0.5,
        delay: i * 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 92%' }
      });
    });

    // Service blocks: fade up
    gsap.utils.toArray('.service-block').forEach((block, i) => {
      gsap.from(block, {
        y: 40, opacity: 0, duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 85%' }
      });
    });

    // Contact items: scale in with stagger
    gsap.utils.toArray('.contact-item').forEach((item, i) => {
      gsap.from(item, {
        scale: 0.8, opacity: 0, duration: 0.5,
        delay: i * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: item, start: 'top 90%' }
      });
    });

  }
});
