const APP_URL = "https://briqueflow.pages.dev/login";

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
    document.dispatchEvent(new CustomEvent('nav:change'));
  });

  const closeNav = () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.dispatchEvent(new CustomEvent('nav:change'));
  };

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });
}

// Botão fixo no celular: aparece quando o botão do topo sai da tela e some
// enquanto os planos, o CTA final ou o rodapé estão visíveis (já têm botão).
const stickyCta = document.getElementById('sticky-cta');
const heroActions = document.querySelector('.hero__actions');

if (stickyCta && heroActions && 'IntersectionObserver' in window) {
  let pastHero = false;
  const blockersInView = new Set();

  const updateSticky = () => {
    const menuOpen = mainNav && mainNav.classList.contains('is-open');
    stickyCta.classList.toggle('is-visible', pastHero && blockersInView.size === 0 && !menuOpen);
  };

  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    updateSticky();
  }).observe(heroActions);

  const blockerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) blockersInView.add(entry.target);
      else blockersInView.delete(entry.target);
    });
    updateSticky();
  });
  ['#planos', '#cta-final', '.site-footer'].forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) blockerObserver.observe(el);
  });

  document.addEventListener('nav:change', updateSticky);
}

// Cabeçalho ganha fundo mais sólido e sombra depois que a página rola
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Motion (GSAP), só pra quem não pediu movimento reduzido.
// A entrada do topo é CSS (styles.css), pra rodar já no primeiro quadro, sem piscar.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();
  const ease = 'power3.out';

  // Revela uma vez ao entrar na tela e devolve o elemento ao CSS no fim
  const reveal = (targets, trigger, vars = {}, start = 'top 85%') => {
    if (!gsap.utils.toArray(targets).length) return;
    gsap.from(targets, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease,
      stagger: 0.08,
      clearProps: 'opacity,transform',
      ...vars,
      scrollTrigger: { trigger, start, once: true },
    });
  };

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Cabeçalhos de seção: rótulo, título e subtítulo em sequência
    gsap.utils.toArray('.section__head, .feature-head').forEach((head) => {
      reveal(head.querySelectorAll('.section__eyebrow, .section__title, .section__subtitle, .feature-head__cta'), head);
    });

    // Benefícios: as colunas sobem e os ícones acendem
    reveal('.stat-row__item', '.stat-row', { stagger: 0.12 });
    reveal('.stat-row__icon', '.stat-row', { y: 0, scale: 0.4, duration: 0.6, ease: 'back.out(2.2)', stagger: 0.12, delay: 0.2 });

    // Problemas: um de cada vez
    reveal('.problem-card', '.problem-grid', { y: 0, x: -20 });

    // Fluxo Compra → Gastos → Venda → Lucro real: cada etapa entra, o valor conta
    // até o número certo e a seta até a próxima se desenha
    const flow = document.querySelector('.flow');
    if (flow) {
      const steps = gsap.utils.toArray('.flow-step');
      const arrows = gsap.utils.toArray('.flow-arrow path');
      const values = steps.map((step) => step.querySelector('.flow-step__value'));
      const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

      arrows.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({ scrollTrigger: { trigger: flow, start: 'top 78%', once: true } });
      tl.call(() => values.forEach((el) => { el.textContent = brl.format(0); }), null, 0);

      steps.forEach((step, i) => {
        const valueEl = values[i];
        const finalText = valueEl.textContent;
        const target = parseFloat(finalText.replace(/[^\d,]/g, '').replace(',', '.'));
        const counter = { value: 0 };
        const at = i * 0.45;

        tl.from(step, { opacity: 0, y: 24, duration: 0.6, ease, clearProps: 'opacity,transform' }, at)
          .to(counter, {
            value: target,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => { valueEl.textContent = brl.format(counter.value); },
            onComplete: () => { valueEl.textContent = finalText; },
          }, at + 0.1);

        if (arrows[i]) tl.to(arrows[i], { strokeDashoffset: 0, duration: 0.45, ease: 'power1.inOut' }, at + 0.35);
      });

      tl.call(() => steps[steps.length - 1].classList.add('is-lit'));
    }

    // Funcionalidades: o texto entra pelo lado dele e a print sobe
    gsap.utils.toArray('.feature-row').forEach((row, i) => {
      const side = i % 2 === 0 ? -32 : 32;
      gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', once: true } })
        .from(row.querySelector('.feature-row__text').children, { opacity: 0, x: side, duration: 0.7, ease, stagger: 0.08, clearProps: 'opacity,transform' })
        .from(row.querySelector('.device-frame'), { opacity: 0, y: 48, scale: 0.96, duration: 0.9, ease, clearProps: 'opacity,transform' }, 0.1);
    });

    // Como funciona: os números acendem em sequência e a linha entre eles se desenha
    const stepsList = document.querySelector('.steps');
    if (stepsList) {
      stepsList.classList.add('will-draw');
      gsap.timeline({
        scrollTrigger: { trigger: stepsList, start: 'top 80%', once: true },
        onStart: () => stepsList.classList.add('is-drawn'),
      })
        .from('.step__number', { opacity: 0, scale: 0.4, duration: 0.5, ease: 'back.out(2.2)', stagger: 0.25, clearProps: 'opacity,transform' })
        .from('.step__title, .step__desc', { opacity: 0, y: 12, duration: 0.5, ease, stagger: 0.08, clearProps: 'opacity,transform' }, 0.15);
    }

    // Planos: os cards sobem e o selo do Vitalício aparece por último
    reveal('.pricing-card', '.pricing-grid', { y: 40, stagger: 0.12 });
    reveal('.pricing-card__badge', '.pricing-grid', { y: 0, scale: 0.6, duration: 0.5, ease: 'back.out(2.2)', delay: 0.45 });
    reveal('.pricing-trust li', '.pricing-trust', { y: 12 }, 'top 95%');

    // Dúvidas
    reveal('.accordion-item', '.accordion', { y: 16, duration: 0.5, stagger: 0.05 });

    // CTA final: os feixes de luz crescem do chão e o conteúdo sobe
    if (document.querySelector('.cta-final')) {
      gsap.timeline({ scrollTrigger: { trigger: '.cta-final', start: 'top 75%', once: true } })
        .from('.cta-final .glow-beams__line', { scaleY: 0, duration: 1.2, ease: 'power2.out' })
        .from('.cta-final__ring', { opacity: 0, scale: 0.5, duration: 0.6, ease: 'back.out(2.2)', clearProps: 'opacity,transform' }, 0.2)
        .from('.cta-final__title > span, .cta-final__subtitle, .cta-final__btn, .cta-final__alt', { opacity: 0, y: 24, duration: 0.7, ease, stagger: 0.08, clearProps: 'opacity,transform' }, 0.3);
    }
  });

  // Parallax leve nas prints de Funcionalidades (só no computador)
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
    gsap.utils.toArray('.feature-row__media').forEach((media) => {
      gsap.fromTo(media, { y: 40 }, {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
}

// Accordion (usado na seção FAQ)
document.querySelectorAll('.accordion-item').forEach((item, index) => {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');
  if (!trigger || !panel) return;

  trigger.id = `faq-trigger-${index}`;
  panel.id = `faq-panel-${index}`;
  trigger.setAttribute('aria-controls', panel.id);
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', trigger.id);

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
