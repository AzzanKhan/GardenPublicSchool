const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const enquiryForm = document.querySelector('#enquiry-form');
const formNote = document.querySelector('#form-note');

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

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const query = String(data.get('query') || '').trim();
  const subject = encodeURIComponent(`Admission enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nQuestion: ${query}`);
  window.location.href = `mailto:info@gardenpublicschool.in?subject=${subject}&body=${body}`;
  if (formNote) formNote.textContent = 'Your email app is opening with the enquiry details ready to send.';
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
