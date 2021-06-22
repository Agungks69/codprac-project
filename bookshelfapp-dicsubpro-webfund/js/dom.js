const UNFINISHED_LIST_BOOK_ID = 'unfinishedReadBooks';
const FINISHED_LIST_BOOK_ID = 'finishedReadBooks';
const BOOK_ITEMID = 'itemId';

function makeBookCard(title, author, release, coverImage, color) {
  const bookImage = document.createElement('img');
  bookImage.src = coverImage;

  const removeButton = createRemoveButton();
  const editButton = createEditButton();
  // removeButton.classList.add('remove-button');
  // editButton.classList.add('edit-button');

  const bookTitle = document.createElement('h4');
  bookTitle.innerText = title;

  const bookAuthorAndRelease = document.createElement('p');
  bookAuthorAndRelease.innerText = `${author}, ${release}`;

  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.setAttribute('draggable', true);
  bookCard.ondragstart = drag;
  bookCard.style.backgroundColor = CARD_BGCOLOR[color];

  bookCard.append(bookImage, removeButton, editButton, bookTitle, bookAuthorAndRelease);

  return bookCard;
}

function addBook() {
  const bookCover = 'assets/default-image.png';
  const bookTitle = document.getElementById('bookTitle').value;
  const authorName = document.getElementById('authorName').value;
  const releaseYear = document.getElementById('releaseYear').value;
  const finishedRead = document.getElementById('finishedRead').checked;
  const cardColor = document.getElementsByClassName('bg-color-opt');
  let color;

  for (let i = 0; i < CARD_BGCOLOR.length; i++) {
    if (cardColor[i].classList.contains('bg-color-opt-click')) {
      color = i;
      break;
    }
  }
  const bookCard = makeBookCard(bookTitle, authorName, releaseYear, bookCover, color);
  const bookObject = composeBookObject(bookTitle, authorName, releaseYear, finishedRead, bookCover, color);
  bookCard[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  const bookList = !finishedRead ? document.getElementById(UNFINISHED_LIST_BOOK_ID) : document.getElementById(FINISHED_LIST_BOOK_ID);
  // console.log(bookList);
  bookList.append(bookCard);

  if (bookList.children.length > 2) {
    bookList.children[1].setAttribute('hidden', true);
  }

  updateDataToStorage();
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.addEventListener('click', function (event) {
    eventListener(event);
  });

  return button;
}

function createRemoveButton() {
  return createButton('remove-button', function (event) {
    removeBook(event.target.parentElement);
  });
}

function createEditButton() {
  return createButton('edit-button', function (event) {
    openFormForEdit(event.target.parentElement);
  });
}

function openFormForEdit(book) {
  const aside = document.querySelector('aside');
  const submitButton = document.getElementById('add-edit-button');
  const form = document.getElementById('form');
  const bookId = book[BOOK_ITEMID];

  const bookItem = books[findBookIndex(bookId)];
  form[BOOK_ITEMID] = bookItem.id;
  document.getElementById('bookTitle').value = bookItem.title;
  document.getElementById('authorName').value = bookItem.author;
  document.getElementById('releaseYear').value = bookItem.year;
  document.getElementById('finishedRead').checked = bookItem.isComplete;
  changeColor(bookItem.color);

  if (!aside.classList.contains('add-edit-open')) {
    formOpen(book.id);
  } else {
    submitButton.innerText = 'Edit Buku';
  }
}

function changeColor(colorNumber) {
  const clicked = document.querySelectorAll('.bg-color-opt-click');
  if (clicked.length !== 0) {
    clicked[0].classList.remove('bg-color-opt-click');
  }
  if (typeof colorNumber === 'number') {
    document.getElementsByClassName('bg-color-opt')[colorNumber].classList.add('bg-color-opt-click');
  } else {
    colorNumber.target.classList.add('bg-color-opt-click');
  }
}

function removeBook(book) {
  if (confirm('Apakah anda yakin ingin menghapus buku ini ?')) {
    if (book.parentElement.children.length === 3) {
      book.parentElement.children[1].removeAttribute('hidden');
    }
    const bookPosition = findBookIndex(book[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    book.remove();
    updateDataToStorage();
  }
}

function editBook(bookId) {
  books[findBookIndex(bookId)].title = document.getElementById('bookTitle').value;
  books[findBookIndex(bookId)].author = document.getElementById('authorName').value;
  books[findBookIndex(bookId)].year = document.getElementById('releaseYear').value;
  books[findBookIndex(bookId)].isComplete = document.getElementById('finishedRead').checked;
  const cardColor = document.getElementsByClassName('bg-color-opt');
  let color;
  for (let i = 0; i < CARD_BGCOLOR.length; i++) {
    if (cardColor[i].classList.contains('bg-color-opt-click')) {
      color = i;
      break;
    }
  }
  books[findBookIndex(bookId)].color = color;
  console.log('Data Berhasil diEdit');

  updateDataToStorage();
}

function formOpen(bookId) {
  const addbtn = document.getElementById('add-button');
  const aside = document.querySelector('aside');
  const content = document.getElementById('content');
  const formArea = document.getElementById('form-area');
  const form = document.getElementById('form');
  const submitButton = document.getElementById('add-edit-button');

  if (bookId === undefined) {
    form[BOOK_ITEMID] = undefined;
    submitButton.innerText = 'Tambah Buku';
  } else {
    submitButton.innerText = 'Edit Buku';
  }
  if (!aside.classList.contains('add-edit-open')) {
    aside.classList.add('add-edit-open');
    content.style.width = '132%';
    addbtn.style.transform = 'rotate(45deg)';
    formArea.removeAttribute('hidden');
  } else {
    aside.classList.remove('add-edit-open');
    addbtn.style.transform = 'rotate(0deg)';
    content.style.width = '100%';
    formArea.setAttribute('hidden', true);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target[BOOK_ITEMID]);
}

function drop(ev) {
  ev.preventDefault();
  const bookId = ev.dataTransfer.getData('text');
  const bookPos = findBookIndex(+bookId);
  if (ev.target.id === UNFINISHED_LIST_BOOK_ID) {
    books[bookPos].isComplete = false;
  } else if (ev.target.id === FINISHED_LIST_BOOK_ID) {
    books[bookPos].isComplete = true;
  }
  updateDataToStorage();
  location.reload();
}

function bookSearch(ev) {
  const listUnfinishedBook = document.getElementById(UNFINISHED_LIST_BOOK_ID);
  const listFinishedBook = document.getElementById(FINISHED_LIST_BOOK_ID);
  const word = ev.target.value.toLowerCase();
  console.log(word);

  const tempBook = [];
  for (let book of books) {
    if (!book.title.toLowerCase().includes(word)) {
      tempBook.push(book);
    }
  }

  for (let i = 2; i < listFinishedBook.children.length; i++) {
    for (let book of tempBook) {
      if (!book.isComplete) continue;
      if (listFinishedBook.children[i][BOOK_ITEMID] === book.id) {
        listFinishedBook.children[i].style.display = 'none';
        break;
      }
      listFinishedBook.children[i].style.display = '';
    }
  }

  for (let i = 2; i < listUnfinishedBook.children.length; i++) {
    for (let book of tempBook) {
      if (book.isComplete) continue;
      if (listUnfinishedBook.children[i][BOOK_ITEMID] === book.id) {
        listUnfinishedBook.children[i].style.display = 'none';
        break;
      }
      listUnfinishedBook.children[i].style.display = '';
    }
  }

  if (word === '') {
    location.reload();
    return;
  }

  console.log(tempBook);
}
