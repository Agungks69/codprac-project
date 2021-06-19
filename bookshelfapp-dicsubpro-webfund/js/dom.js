const BOOK_ID = 'bookId';

function makeBookCard(title, author, release, coverImage, cardBg) {
  const bookImage = document.createElement('img');
  bookImage.src = coverImage;

  const removeButton = document.createElement('button');
  const editButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  editButton.classList.add('edit-button');

  const bookTitle = document.createElement('h4');
  bookTitle.innerText = title;

  const bookAuthorAndRelease = document.createElement('p');
  bookAuthorAndRelease.innerText = `${author}, ${release}`;

  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.setAttribute('draggable', true);
  bookCard.ondragstart = drag;
  bookCard.style.backgroundColor = cardBg;

  bookCard.append(bookImage, removeButton, editButton, bookTitle, bookAuthorAndRelease);

  return bookCard;
}

function addBookCard() {
  const unfinishedReadBook = document.getElementById('unfinishedRead');
  const bookCover = 'assets/default-image.png';
  const bookTitle = document.getElementById('bookTitle').value;
  const authorName = document.getElementById('authorName').value;
  const releaseYear = document.getElementById('releaseYear').value;
  const finishedRead = document.getElementById('finishedRead').value;
  const cardColor = document.getElementsByClassName('bg-color-opt-click');

  const bookCard = makeBookCard(bookTitle, authorName, releaseYear, bookCover, cardColor[0].style.backgroundColor);

  if (unfinishedReadBook.lastElementChild.className === 'void') {
    unfinishedReadBook.lastElementChild.setAttribute('hidden', true);
  }
  unfinishedReadBook.append(bookCard);
}

function AddorEdit() {
  const addbtn = document.getElementById('add-button');
  const aside = document.querySelector('aside');
  const content = document.getElementById('content');

  const formArea = document.getElementById('form-area');
  if (!aside.classList.length) {
    aside.classList.add('add-edit-open');
    content.style.width = '132%';
    addbtn.classList.add('rotate-add');
    formArea.removeAttribute('hidden');
  } else {
    aside.classList.remove('add-edit-open');
    addbtn.classList.remove('rotate-add');
    content.style.width = '100%';
    formArea.setAttribute('hidden', true);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.target['todoId'] = 'pocong';
  ev.dataTransfer.setData('text', ev.target.todoId);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  let book = saveData(data);
  ev.target.appendChild(book);
}

function saveData(id) {
  const bookList = document.getElementsByClassName('book-card');
  for (let book of bookList) {
    if (book.todoId === id) {
      return book;
    }
  }
}
