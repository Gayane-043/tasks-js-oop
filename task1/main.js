const navLinks = document.querySelectorAll('.nav__links-item');
navLinks.forEach((link) =>
  link.addEventListener('click', (e) => {
    navLinks.forEach((link) => {
      e.target === link
        ? link.classList.add('nav__links-item--active')
        : link.classList.remove('nav__links-item--active');
    });
  })
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
});

window.addEventListener('resize', (e) => {
  if (e.target.innerWidth > 768 && hamburger.classList.contains('active')) {
    hamburger.classList.remove('active');
  }
});