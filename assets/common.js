/* ===============================
   MOBILE NAVIGATION (BURGER)
================================ */

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
}

/* Close nav when a link is clicked (mobile UX) */
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
    burger.classList.remove('toggle');
  });
});