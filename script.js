const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
reveals.forEach((el) => io.observe(el));

const hero = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.15;
  hero.style.transform = `translateY(${y}px)`;
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerOffset = header ? header.offsetHeight + 10 : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    history.replaceState(null, '', targetId);
  });
});


const blob = document.getElementById('blob');
const cards = document.querySelectorAll('.glass-card');

if (!prefersReducedMotion) {
  window.addEventListener('pointermove', (event) => {
    const { clientX, clientY } = event;
    if (blob) blob.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);
      const xRotation = Math.max(-8, Math.min(8, -dy / 28));
      const yRotation = Math.max(-8, Math.min(8, dx / 28));
      card.style.transform = `perspective(1200px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });
  });

  window.addEventListener('pointerleave', () => {
    cards.forEach((card) => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
  });
}
