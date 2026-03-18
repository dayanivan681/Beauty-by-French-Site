// Beauty by French – Scripts

document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('done'), 1400);
  });
  // Fallback – hide preloader after 3s even if images fail
  setTimeout(() => preloader.classList.add('done'), 3000);

  // --- Navbar scroll ---
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile menu ---
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    })
  );

  // --- Hero slider ---
  const slides     = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  let cur = 0, timer;

  function goSlide(i) {
    slides[cur].classList.remove('active');
    indicators[cur].classList.remove('active');
    cur = i;
    slides[cur].classList.add('active');
    indicators[cur].classList.add('active');
  }
  function next() { goSlide((cur + 1) % slides.length); }
  function startTimer() { timer = setInterval(next, 5000); }

  indicators.forEach(btn => btn.addEventListener('click', () => {
    clearInterval(timer);
    goSlide(+btn.dataset.index);
    startTimer();
  }));
  startTimer();

  // --- Gallery filter ---
  const filterBtns = document.querySelectorAll('.gf-btn');
  const items      = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(el => {
      el.classList.toggle('hidden', f !== 'all' && el.dataset.cat !== f);
    });
  }));

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll(
    '.svc-card, .gallery-item, .team-member, .review-card, ' +
    '.about-body, .about-imgs, .contact-left, .contact-form, ' +
    '.parallax-body, .section-head, .stats-row, .info-item'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        const y = t.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // --- Contact form ---
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Mensaje Enviado';
      btn.style.background = '#4CAF50';
      btn.style.borderColor = '#4CAF50';
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });

});
