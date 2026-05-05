const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
reveals.forEach((el) => io.observe(el));

const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (event) => {
  cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const hero = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.2;
  hero.style.transform = `translateY(${y}px)`;
});
