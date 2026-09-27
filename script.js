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
const hasIO = 'IntersectionObserver' in window;

const openInNewTab = (el) => {
  el.target = '_blank';
  el.rel = 'noopener';
};

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

  // Services → WhatsApp with the service pre-filled
  document.querySelectorAll('[data-wa-service]').forEach(el => {
    el.href = waLink(`Hola Beauty by French, me interesa: ${el.dataset.waService}. ¿Podemos coordinar una evaluación?`);
    openInNewTab(el);
  });

  // FAQ → WhatsApp with the question pre-filled
  document.querySelectorAll('[data-wa-question]').forEach(el => {
    el.href = waLink(`Hola Frances, tengo una pregunta: ${el.dataset.waQuestion}`);
    openInNewTab(el);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Header: border on scroll, transparent over the mobile hero ---
  const header = document.getElementById('header');
  const hero = document.getElementById('top');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    header.classList.toggle('at-top', y < hero.offsetHeight - header.offsetHeight);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
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

  // --- Carousel progress bars (mobile) ---
  const updateProgress = (track) => {
    const bar = track.parentElement.querySelector('.snap-progress span');
    if (!bar) return;
    const max = track.scrollWidth - track.clientWidth;
    const visible = track.clientWidth / track.scrollWidth;
    const ratio = max > 0 ? track.scrollLeft / max : 1;
    bar.style.transform = `scaleX(${Math.min(1, visible + ratio * (1 - visible))})`;
  };
  document.querySelectorAll('.snap').forEach(track => {
    track.addEventListener('scroll', () => updateProgress(track), { passive: true });
    window.addEventListener('resize', () => updateProgress(track));
    updateProgress(track);
  });

  // --- Portfolio filter ---
  const gallery = document.getElementById('gallery');
  const filters = document.querySelectorAll('.filter');
  const items = [...document.querySelectorAll('.gallery-item')];

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      const f = btn.dataset.filter;
      items.forEach(item => {
        item.hidden = f !== 'all' && !item.dataset.category.split(' ').includes(f);
      });
      gallery.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      updateProgress(gallery);
    });
  });

  // --- Lightbox with prev/next, keyboard and swipe ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCap');
  const lbCount = document.getElementById('lightboxCount');
  const lbCta = document.getElementById('lightboxCta');
  let visibleItems = [];
  let current = 0;

  const largestSrc = (img) => {
    const last = (img.getAttribute('srcset') || '').split(',').pop().trim().split(' ')[0];
    return last || img.src;
  };

  const show = (i) => {
    current = (i + visibleItems.length) % visibleItems.length;
    const item = visibleItems[current];
    const img = item.querySelector('img');
    const name = item.querySelector('strong')?.textContent || '';
    lbImg.src = largestSrc(img);
    lbImg.alt = img.alt;
    lbImg.classList.remove('swap');
    void lbImg.offsetWidth;
    lbImg.classList.add('swap');
    lbCap.textContent = name;
    lbCount.textContent = `${current + 1} / ${visibleItems.length}`;
    lbCta.href = waLink(`Hola Beauty by French, vi el look "${name}" en su web y quiero cotizarlo.`);
  };

  items.forEach(item => {
    item.querySelector('.gallery-btn').addEventListener('click', () => {
      visibleItems = items.filter(it => !it.hidden);
      show(visibleItems.indexOf(item));
      lightbox.showModal();
    });
  });

  document.getElementById('lightboxPrev').addEventListener('click', () => show(current - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => show(current + 1));
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-fig')) lightbox.close();
  });
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  lightbox.addEventListener('close', () => { lbImg.src = ''; });

  let touchX = null;
  lbImg.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // --- FAQ: one answer open at a time ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) faqItems.forEach(o => { if (o !== d) o.open = false; });
  }));

  // --- Booking bar (mobile) and floating buttons (desktop) ---
  const bookBar = document.getElementById('bookBar');
  const floats = document.getElementById('floats');
  if (hasIO) {
    let pastHero = false;
    const covering = new Set();
    const update = () => {
      bookBar.classList.toggle('show', pastHero && covering.size === 0);
      floats.classList.toggle('is-hidden', covering.size > 0);
    };
    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    }).observe(document.getElementById('heroActions'));
    const coverObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? covering.add(e.target) : covering.delete(e.target));
      update();
    });
    coverObserver.observe(document.querySelector('.form-embed'));
    coverObserver.observe(footer);
  } else {
    bookBar.classList.add('show');
  }

  // --- Count-up numbers ---
  const counters = document.querySelectorAll('[data-count]');
  if (hasIO && !reduceMotion) {
    const format = (el, v) => {
      el.textContent = v.toFixed(Number(el.dataset.decimals || 0));
    };
    counters.forEach(el => format(el, 0));
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 1400);
          format(el, target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(el => countObserver.observe(el));
  }

  // --- Reveal on scroll ---
  const reveals = document.querySelectorAll('.reveal');
  if (hasIO) {
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
