const CARD_BGCOLOR = ['#8ecae6', '#219ebc', '#ffb703', '#fb8500', '#ee6c4d'];

const bgColor = document.querySelectorAll('.bg-color-opt');

for (let i = 0; i < bgColor.length; i++) {
  bgColor[i].style.backgroundColor = CARD_BGCOLOR[i];

  bgColor[i].addEventListener('click', function (event) {
    const clicked = document.querySelectorAll('.bg-color-opt-click');
    if (clicked.length !== 0) {
      clicked[0].classList.remove('bg-color-opt-click');
    }
    event.target.classList.add('bg-color-opt-click');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const submitForm /* HTMLFormElement */ = document.getElementById('form');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBookCard();
  });
});
