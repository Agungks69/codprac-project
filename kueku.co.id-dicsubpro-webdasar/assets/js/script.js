const navLink = document.querySelectorAll('a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const loginRegister = document.querySelector('.login-register');

function toggleSidebar(ref) {
  document.getElementById('sidebar').classList.toggle('active');
}

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  loginRegister.classList.toggle('active');
}

navLink.forEach((linkItem) => {
  linkItem.addEventListener('click', (event) => {
    changeClassNav();
    event.target.classList.add('active-nav');
  });
});

window.onscroll = () => {
  if (window.pageYOffset >= 0) {
    changeClassNav();
    navLink[0].classList.add('active-nav');
  } else {
    navLink[0].classList.remove('active-nav');
  }
  if (window.pageYOffset >= 600) {
    changeClassNav();
    navLink[1].classList.add('active-nav');
  } else {
    navLink[1].classList.remove('active-nav');
  }

  if (window.pageYOffset >= 1500) {
    changeClassNav();
    navLink[2].classList.add('active-nav');
  } else {
    navLink[2].classList.remove('active-nav');
  }
};

function changeClassNav() {
  const curActive = document.getElementsByClassName('active-nav');
  curActive[0].classList.remove('active-nav');
}
