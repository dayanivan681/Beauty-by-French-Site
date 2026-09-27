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
    document.getElementById('bookBar').inert = open;
    document.getElementById('floats').inert = open;
    if (open) menu.querySelector('a').focus();
  };

  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !menu.hidden) {
      const links = [...menu.querySelectorAll('a[href]')];
      const controls = [toggle, ...links];
      const index = controls.indexOf(document.activeElement);
      e.preventDefault();
      controls[(index + (e.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
    }
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
      gallery.scrollTo({ left: 0, behavior: 'auto' });
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
  let requested = 0;
  let imageRequest = 0;
  const imageLoads = new Map();

  const largestSrc = (img) => {
    const sources = (img.getAttribute('srcset') || '').split(',').map(entry => {
      const [src, size] = entry.trim().split(/\s+/);
      return { src, width: parseInt(size, 10) || 0 };
    });
    return sources.find(source => source.width >= 960)?.src || sources.at(-1)?.src || img.src;
  };

  const loadImage = (src) => {
    if (!imageLoads.has(src)) {
      const image = new Image();
      image.src = src;
      const load = image.decode ? image.decode() : new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
      imageLoads.set(src, load.catch(error => {
        imageLoads.delete(src);
        throw error;
      }));
    }
    return imageLoads.get(src);
  };

  const show = async (i) => {
    const request = ++imageRequest;
    const position = (i + visibleItems.length) % visibleItems.length;
    requested = position;
    const item = visibleItems[position];
    const img = item.querySelector('img');
    const name = item.querySelector('strong')?.textContent || '';
    let src = largestSrc(img);
    try {
      await loadImage(src);
    } catch {
      src = img.currentSrc || img.src;
      try {
        await loadImage(src);
      } catch {
        if (request === imageRequest) {
          requested = current;
          if (!lbImg.hasAttribute('src')) lightbox.close();
        }
        return;
      }
    }
    if (request !== imageRequest || !lightbox.open) return;
    current = position;
    lbImg.src = src;
    lbImg.alt = img.alt;
    lbImg.hidden = false;
    lbImg.classList.remove('swap');
    void lbImg.offsetWidth;
    lbImg.classList.add('swap');
    lbCap.textContent = name;
    lbCount.textContent = `${current + 1} / ${visibleItems.length}`;
    lbCta.href = waLink(`Hola Beauty by French, vi el look "${name}" en su web y quiero cotizarlo.`);
    const next = visibleItems[(current + 1) % visibleItems.length].querySelector('img');
    loadImage(largestSrc(next)).catch(() => {});
  };

  items.forEach(item => {
    item.querySelector('.gallery-btn').addEventListener('click', () => {
      visibleItems = items.filter(it => !it.hidden);
      lightbox.showModal();
      document.body.classList.add('lightbox-open');
      show(visibleItems.indexOf(item));
    });
  });

  document.getElementById('lightboxPrev').addEventListener('click', () => show(requested - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => show(requested + 1));
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-fig')) lightbox.close();
  });
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(requested - 1);
    if (e.key === 'ArrowRight') show(requested + 1);
  });
  lightbox.addEventListener('close', () => {
    imageRequest++;
    lbImg.removeAttribute('src');
    lbImg.hidden = true;
    document.body.classList.remove('lightbox-open');
  });

  let touchX = null;
  lbImg.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(requested + (dx < 0 ? 1 : -1));
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
    coverObserver.observe(document.querySelector('.team'));
    coverObserver.observe(footer);
  } else {
    bookBar.classList.add('show');
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
