// ============================================
// Beauty by French — Scripts
// ============================================

// --------------------------------------------
// Datos del negocio — edita SOLO este bloque.
// --------------------------------------------
const SITE = {
  whatsapp: '17873456218',   // número con código de país, solo dígitos
  phone: '+17873456218',
  phoneDisplay: '(787) 345-6218',
  instagram: 'beautybyfrench', // usuario sin @
  linktree: 'beautybyfrench',
};

const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const LINKS = {
  whatsapp: waLink('Hola Beauty by French, me gustaría cotizar una evaluación.'),
  instagram: `https://www.instagram.com/${SITE.instagram}/`,
  linktree: `https://linktr.ee/${SITE.linktree}`,
  phone: `tel:${SITE.phone}`,
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Preloader (hidden on load, capped so it never blocks) ---
const preloader = document.getElementById('preloader');
const hidePreloader = () => preloader?.classList.add('done');
if (reduceMotion) hidePreloader();
window.addEventListener('load', () => setTimeout(hidePreloader, 300));
setTimeout(hidePreloader, 1500);

document.addEventListener('DOMContentLoaded', () => {

  // --- Bind business data ---
  document.querySelectorAll('[data-site-href]').forEach(el => {
    el.href = LINKS[el.dataset.siteHref];
  });

  const TEXT = {
    phoneDisplay: SITE.phoneDisplay,
    instagramHandle: `@${SITE.instagram}`,
  };
  document.querySelectorAll('[data-site-text]').forEach(el => {
    el.textContent = TEXT[el.dataset.siteText];
  });

  // Service list → WhatsApp with the service pre-filled
  document.querySelectorAll('[data-wa-service]').forEach(el => {
    el.href = waLink(`Hola Beauty by French, me interesa: ${el.dataset.waService}. ¿Podemos coordinar una evaluación?`);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Header border on scroll ---
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile menu ---
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const main = document.getElementById('main');
  const footer = document.querySelector('.site-footer');

  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
    main.inert = open;
    footer.inert = open;
    if (open) menu.querySelector('a').focus();
  };

  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  // --- Portfolio filter ---
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.gallery-item');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      const f = btn.dataset.filter;
      items.forEach(item => {
        item.hidden = f !== 'all' && !item.dataset.category.split(' ').includes(f);
      });
    });
  });

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCap');

  document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = btn.querySelector('strong')?.textContent || '';
      lightbox.showModal();
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => { lbImg.src = ''; });

  // --- Reveal on scroll ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
});
