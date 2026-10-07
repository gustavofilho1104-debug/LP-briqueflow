// Troque pela URL final do app/cadastro quando estiver definida.
const APP_URL = "#";

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('.js-app-link').forEach((el) => {
  el.setAttribute('href', APP_URL);
});

// Menu mobile
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Motion (GSAP) — só roda se o visitante não pediu movimento reduzido
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Entrada do Hero, em sequência
    gsap.timeline()
      .from('.hero__title', { opacity: 0, y: 20, duration: 0.5, ease: 'power1.out', clearProps: 'all' })
      .from('.hero__subtitle', { opacity: 0, y: 16, duration: 0.45, ease: 'power1.out', clearProps: 'all' }, '-=0.3')
      .from('.hero__actions .btn', { opacity: 0, y: 12, duration: 0.4, stagger: 0.08, ease: 'power1.out', clearProps: 'all' }, '-=0.25')
      .from('.hero__trust', { opacity: 0, duration: 0.4, clearProps: 'all' }, '-=0.2')
      .from('.hero__visual .device-frame', { opacity: 0, y: 24, scale: 0.98, duration: 0.6, ease: 'power1.out', clearProps: 'all' }, '-=0.5');

    // Títulos de seção revelados ao rolar
    gsap.utils.toArray('.section__head').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: 'power1.out',
        clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    });

    // Grids e listas revelados em sequência
    ['.stat-row > *', '.problem-grid > *', '.steps > *', '.pricing-grid > *', '.accordion-item'].forEach((selector) => {
      const items = gsap.utils.toArray(selector);
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power1.out',
        clearProps: 'all',
        scrollTrigger: { trigger: items[0].closest('section'), start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    });

    // Linhas de Funcionalidades, cada uma revelada ao entrar na tela
    gsap.utils.toArray('.feature-row').forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power1.out',
        clearProps: 'all',
        scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    });

    // Fluxo Compra -> Gastos -> Venda -> Lucro real, passo a passo
    const flowItems = gsap.utils.toArray('.flow > *');
    if (flowItems.length) {
      gsap.from(flowItems, {
        opacity: 0,
        y: 16,
        duration: 0.35,
        stagger: 0.12,
        ease: 'power1.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '.flow', start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }

    // CTA final
    gsap.from('.cta-final__box', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power1.out',
      clearProps: 'all',
      scrollTrigger: { trigger: '.cta-final__box', start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  });
}

// Accordion (usado na seção FAQ)
document.querySelectorAll('.accordion-item').forEach((item) => {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.accordion-item.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('is-open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});
