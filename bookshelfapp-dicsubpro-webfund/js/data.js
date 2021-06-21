const STORAGE_KEY = 'BOOKSHELF_APPS';

const CARD_BGCOLOR = ['#8ecae6', '#219ebc', '#ffb703', '#fb8500', '#ee6c4d'];
let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookObject(title, author, year, isComplete, cover, color) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
    cover,
    color,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }
  return -1;
}

function refreshDataFromBooks() {
  const listUnfinishedBook = document.getElementById(UNFINISHED_LIST_BOOK_ID);
  const listFinishedBook = document.getElementById(FINISHED_LIST_BOOK_ID);
  for (book of books) {
    const newBook = makeBookCard(book.title, book.author, book.year, book.cover, book.color);
    newBook[BOOK_ITEMID] = book.id;

    if (book.isComplete) {
      listFinishedBook.append(newBook);
    } else {
      listUnfinishedBook.append(newBook);
    }
  }
  if (listFinishedBook.children.length > 2) {
    listFinishedBook.children[1].setAttribute('hidden', true);
  }
  if (listUnfinishedBook.children.length > 2) {
    listUnfinishedBook.children[1].setAttribute('hidden', true);
  }
}
