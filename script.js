const productTrack = document.querySelector('.product-track');
const productSet = productTrack?.querySelector('.product-set');

if (productTrack && productSet) {
  const duplicateProductSet = productSet.cloneNode(true);
  duplicateProductSet.setAttribute('aria-hidden', 'true');
  productTrack.appendChild(duplicateProductSet);
}

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
const maxTilt = 4;
const influenceRadius = 360;

if (!prefersReducedMotion) {
  window.addEventListener('pointermove', (event) => {
    const { clientX, clientY } = event;
    if (blob) blob.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > influenceRadius) {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        return;
      }

      const strength = 1 - distance / influenceRadius;
      const xRotation = Math.max(-maxTilt, Math.min(maxTilt, (-dy / 45) * strength));
      const yRotation = Math.max(-maxTilt, Math.min(maxTilt, (dx / 45) * strength));
      card.style.transform = `perspective(1200px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });
  });

  window.addEventListener('pointerleave', () => {
    cards.forEach((card) => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
  });
}
