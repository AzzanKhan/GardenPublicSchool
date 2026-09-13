const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const previousButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let carouselIndex = 0;
let carouselTimer;

function moveCarousel(direction = 1) {
  if (!carouselTrack || !carouselSlides.length) return;
  const slideWidth = carouselSlides[0].getBoundingClientRect().width + 16;
  const visibleSlides = window.innerWidth <= 800 ? 1 : 3;
  const maxIndex = Math.max(0, carouselSlides.length - visibleSlides);
  carouselIndex = carouselIndex + direction;
  if (carouselIndex > maxIndex) carouselIndex = 0;
  if (carouselIndex < 0) carouselIndex = maxIndex;
  carouselTrack.style.transform = `translateX(-${carouselIndex * slideWidth}px)`;
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => moveCarousel(1), 4000);
}

nextButton?.addEventListener('click', () => {
  moveCarousel(1);
  startCarousel();
});

previousButton?.addEventListener('click', () => {
  moveCarousel(-1);
  startCarousel();
});

carouselTrack?.addEventListener('mouseenter', () => clearInterval(carouselTimer));
carouselTrack?.addEventListener('mouseleave', startCarousel);
window.addEventListener('resize', () => moveCarousel(0));
startCarousel();

const revealItems = document.querySelectorAll('.feature-card, .story-title, .story-body, .admission-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});
