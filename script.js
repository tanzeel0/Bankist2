'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Learn More
const sec1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  sec1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //Remove
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //Activate
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');
const navHieght = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`,
});
headerObs.observe(header);

//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const secObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  secObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

//slider

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const slides = document.querySelectorAll('.slide');

let curSlide = 0;
const maxSlide = slides.length;

const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

const createDots = function () {
  slides.forEach(function (_, id) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${id}"</button>`
    );
  });
};

const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  gotoSlide(0);
  createDots();
  activateDots(0);
};
init();

//NextSlide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  gotoSlide(curSlide);
  activateDots(curSlide);
};
//PrevSlide
const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  gotoSlide(curSlide);
  activateDots(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDots(slide);
  }
});

// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2], //%
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(sec1);

////////////////////////////////////////////////
////////////////////////////////////////////////
// //sticky nav bar
// const initialCoords = sec1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//scroll to section
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//1. Add event listener to common parent element
//2. Determine what element originated the event

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   const id = e.target.getAttribute('href');
//   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// });

// // // // // // // // // // // //
// // // // // // // // // // // //

// console.log(document.documentElement);
// console.log(document.head);
// const allSection = document.querySelectorAll('.section');

// console.log(allSection);

// document.getElementById('sectiom--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// //craeting and inserting elements
// //.insertAdjacentHTML

// const header = document.querySelector('.header');

// const msg = document.createElement('div');
// msg.classList.add('cookie-message');

// msg.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

// //header.prepend(msg);
// header.append(msg);

// //header.append(msg.cloneNode(true));

// // header.before(msg);
// // header.after(msg);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     //msg.remove();
//     msg.parentElement.removeChild(msg);
//   });

// //styles
// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%';

// console.log(msg.style.backgroundColor);
// console.log(msg.style.color);
// console.log(msg.style.height);

// console.log(getComputedStyle(msg).color);
// console.log(getComputedStyle(msg).height);

// msg.style.height =
//   Number.parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Atributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);
// console.log(logo.src);

// console.log(logo.getAttribute('alt'));

// logo.setAttribute('company', 'bankist');
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// //console.log(link.href);
// console.log(link.getAttribute('href'));
// console.log(logo.dataset.versionNumber);

// // //classes
// // logo.classList.add('c', 'j');
// // logo.classList.remove('c', 'j');
// // logo.classList.toggle('c');
// // logo.classList.contains('c');

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const sec1 = document.querySelector('#section--1');

//
//   const s1coords = sec1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());
//   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

// });

//const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! you are reading the heading');
// });

//const alertH1 = function (e) {
//alert('addEventListener: Great! you are reading the heading');

//h1.removeEventListener('mouseenter', alertH1);
//};
//h1.addEventListener('mouseenter', alertH1);

//setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! you are reading the heading');
// };

// rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('Container', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   e.stopImmediatePropagation();
// });
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('NAV', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

// const h1 = document.querySelector('h1');

// ///going downwards : child
// console.log(h1.querySelector('.highlight'));
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //going sideways
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement);
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el != h1) el.style.transform = 'scale(0.5)';
// });

// //Tabbed Component

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and dom tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
