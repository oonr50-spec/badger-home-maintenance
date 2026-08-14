const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Before/after sliders
for (const box of document.querySelectorAll('[data-compare]')) {
  const range = box.querySelector('input[type="range"]');
  const update = () => box.style.setProperty('--pos', `${range.value}%`);
  range.addEventListener('input', update, {passive:true});
  update();
}

// Gallery filter
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.gallery-item');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const wanted = button.dataset.filter;
  items.forEach(item => item.classList.toggle('hidden', wanted !== 'all' && item.dataset.category !== wanted));
}));

// Gallery lightbox
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
items.forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector('img').alt;
  lightbox.showModal();
}));
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

// Service links pre-select the matching service in the quote form
const serviceSelect = document.querySelector('#service-select');
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const value = link.dataset.service;
  if ([...serviceSelect.options].some(o => o.value === value || o.text === value)) serviceSelect.value = value;
}));

// Friendly Badger mascot: intentionally helpful rather than a disruptive popup.
const mascot = document.querySelector('#mascot');
const mascotMessage = document.querySelector('#mascot-message');
const messages = [
  'Hope your day is going well. If there is a job you have been putting off, I can help you get a free quote.',
  'Thanks for visiting Badger Home Maintenance. Wishing you a safe and productive day!',
  'Small job or bigger project? Send a few photos on WhatsApp and we can take a look.',
  'Your home deserves careful work. Have a great day from Badger Home Maintenance!',
  'Need a hand? Tap Call or WhatsApp at the bottom of the screen — no pressure, just a free quote.'
];
let messageTimer;
mascot?.addEventListener('click', () => {
  const message = messages[Math.floor(Math.random() * messages.length)];
  mascotMessage.textContent = message;
  mascotMessage.classList.add('show');
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => mascotMessage.classList.remove('show'), 6500);
});

// Current copyright year
document.querySelector('#year').textContent = new Date().getFullYear();
