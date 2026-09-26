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
  whatsapp: waLink('Hola Beauty by French, me gustaría reservar una cita.'),
  instagram: `https://www.instagram.com/${SITE.instagram}/`,
  linktree: `https://linktr.ee/${SITE.linktree}`,
  phone: `tel:${SITE.phone}`,
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
    // Keep any icon inside the element; replace only the leading text
    const text = TEXT[el.dataset.siteText];
    if (el.firstChild?.nodeType === Node.TEXT_NODE) el.firstChild.textContent = text + (el.children.length ? ' ' : '');
    else el.prepend(text);
  });

  // Service menu → WhatsApp with the service pre-filled
  document.querySelectorAll('[data-wa-service]').forEach(el => {
    el.href = waLink(`Hola Beauty by French, me gustaría reservar: ${el.dataset.waService}.`);
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

  // --- Booking form → WhatsApp ---
  const form = document.getElementById('bookingForm');
  const status = document.getElementById('formStatus');
  const dateInput = document.getElementById('f-date');
  dateInput.min = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach(field => {
      const bad = !field.value.trim();
      field.closest('.field').classList.toggle('invalid', bad);
      field.setAttribute('aria-invalid', String(bad));
      if (bad && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = 'Completa tu nombre y el servicio.';
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const date = data.get('date')
      ? new Date(`${data.get('date')}T12:00`).toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
      : '';

    const note = data.get('note').trim();
    const lines = [
      'Hola Beauty by French, me gustaría reservar una cita.',
      '',
      `Nombre: ${data.get('name').trim()}`,
      `Servicio: ${data.get('service')}`,
      date ? `Fecha preferida: ${date}` : null,
      data.get('time') ? `Horario: ${data.get('time')}` : null,
      note ? `Nota: ${note}` : null,
    ].filter(line => line !== null);

    const url = waLink(lines.join('\n'));
    const win = window.open(url, '_blank');
    if (win) win.opener = null;

    // Always offer a manual link in case the popup was blocked
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'toca aquí';
    status.replaceChildren('Abriendo WhatsApp… Si no se abrió, ', a, '.');
  });

  form.addEventListener('input', (e) => {
    const field = e.target.closest('.field');
    if (field?.classList.contains('invalid') && e.target.value.trim()) {
      field.classList.remove('invalid');
      e.target.setAttribute('aria-invalid', 'false');
    }
  });
});
