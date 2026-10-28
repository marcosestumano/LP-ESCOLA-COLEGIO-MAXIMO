// Header com borda só depois de rolar
const header = document.querySelector('header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });

// Menu mobile
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const closeMenu = () => {
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
};
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Menus suspensos (hover no desktop, toque no mobile)
const closeDropdowns = except => {
  document.querySelectorAll('.dd.open').forEach(dd => {
    if (dd === except) return;
    dd.classList.remove('open');
    dd.querySelector('.dd-btn').setAttribute('aria-expanded', 'false');
  });
};
document.querySelectorAll('.dd-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dd = btn.parentElement;
    closeDropdowns(dd);
    const open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
});
document.addEventListener('click', e => { if (!e.target.closest('.dd')) closeDropdowns(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDropdowns(); closeMenu(); } });

// Abas (diferenciais da home)
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x === t));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.dataset.panel === t.dataset.tab));
}));

// Única animação de scroll: títulos de seção, uma vez só
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .3 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// Formulários de demonstração (ainda sem envio real)
document.querySelectorAll('form[data-demo]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.querySelector('button[type=submit]').textContent = f.dataset.demo;
}));


// Carrossel de banners da home
(() => {
  const c = document.querySelector('.carousel');
  if (!c) return;
  const vp = c.querySelector('.car-viewport');
  const track = c.querySelector('.car-track');
  const slides = [...c.querySelectorAll('.car-slide')];
  const dotsBox = c.querySelector('.car-dots');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DELAY = 6000;
  let i = 0, timer = null;

  const dots = slides.map((_, k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'car-dot';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Banner ${k + 1} de ${slides.length}`);
    b.addEventListener('click', () => { go(k); start(); });
    dotsBox.appendChild(b);
    return b;
  });

  // A altura acompanha o banner ativo (os banners têm proporções diferentes)
  const fit = () => {
    const img = slides[i].querySelector('img');
    if (img.complete && img.naturalWidth) vp.style.height = img.offsetHeight + 'px';
  };

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = `translateX(${-i * 100}%)`;
    dots.forEach((d, k) => d.setAttribute('aria-selected', k === i));
    slides.forEach((s, k) => {
      s.setAttribute('aria-hidden', k !== i);
      if (s.tagName === 'A') s.tabIndex = k === i ? 0 : -1;
    });
    // garante que o banner atual e o próximo já estejam carregando
    [i, (i + 1) % slides.length].forEach(k => slides[k].querySelector('img').loading = 'eager');
    fit();
  }

  function stop() { clearInterval(timer); timer = null; }
  function start() { stop(); if (!reduce) timer = setInterval(() => go(i + 1), DELAY); }

  slides.forEach(s => s.querySelector('img').addEventListener('load', fit));
  addEventListener('resize', fit);
  c.querySelector('.prev').addEventListener('click', () => { go(i - 1); start(); });
  c.querySelector('.next').addEventListener('click', () => { go(i + 1); start(); });

  // Pausa enquanto o mouse ou o foco estão no carrossel, ou a aba está oculta
  c.addEventListener('mouseenter', stop);
  c.addEventListener('mouseleave', start);
  c.addEventListener('focusin', stop);
  c.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  // Setas do teclado
  c.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { go(i - 1); start(); }
    if (e.key === 'ArrowRight') { go(i + 1); start(); }
  });

  // Arrastar no celular
  let x0 = null;
  vp.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  vp.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
    start();
  });

  go(0);
  start();
})();
