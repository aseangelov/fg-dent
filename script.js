const body = document.body;
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.main-nav a');

function closeMenu() {
  body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Отвори менюто');
}

menuButton.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Затвори менюто' : 'Отвори менюто');
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const reviews = [
  { quote: 'За първи път отидох на зъболекар без страх. Всичко ми беше обяснено спокойно, а отношението беше прекрасно.', initials: 'ЕК', name: 'Елена Костова' },
  { quote: 'Получих ясен план, точна цена и внимание във всяка стъпка. Бих препоръчал клиниката на цялото си семейство.', initials: 'НП', name: 'Николай Петров' },
  { quote: 'Детето ми вече не се притеснява от прегледите. Благодарна съм за търпението, усмивките и професионалната грижа.', initials: 'МД', name: 'Мария Димова' }
];

let reviewIndex = 0;
const quote = document.getElementById('testimonial-quote');
const reviewerInitials = document.getElementById('reviewer-initials');
const reviewerName = document.getElementById('reviewer-name');
const reviewCount = document.getElementById('review-count');

function showReview(index) {
  reviewIndex = (index + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    quote.animate([
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 350, easing: 'ease-out' });
  }
  quote.textContent = review.quote;
  reviewerInitials.textContent = review.initials;
  reviewerName.textContent = review.name;
  reviewCount.textContent = `${String(reviewIndex + 1).padStart(2, '0')} / ${String(reviews.length).padStart(2, '0')}`;
}

document.getElementById('review-prev').addEventListener('click', () => showReview(reviewIndex - 1));
document.getElementById('review-next').addEventListener('click', () => showReview(reviewIndex + 1));
document.getElementById('year').textContent = new Date().getFullYear();
