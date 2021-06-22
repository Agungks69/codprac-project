const bgColor = document.querySelectorAll('.bg-color-opt');
const search = document.querySelector('#search');

for (let i = 0; i < bgColor.length; i++) {
  bgColor[i].style.backgroundColor = CARD_BGCOLOR[i];

  bgColor[i].addEventListener('click', changeColor);
}

search.addEventListener('keyup', bookSearch);

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  search.select();
  submitForm.addEventListener('submit', function (event) {
    // event.preventDefault();
    const bookId = event.target[BOOK_ITEMID];
    console.log(bookId);
    if (bookId === undefined) {
      addBook();
    } else {
      editBook(bookId);
    }
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  console.log('Data berhasil disimpan.');
});
document.addEventListener('ondataloaded', () => {
  refreshDataFromBooks();
});
