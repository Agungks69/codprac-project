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
  console.log(id);
  const bookList = document.getElementsByClassName('book-card');
  for (let book of bookList) {
    if (book.todoId === id) {
      return book;
    }
  }
}

function AddorEdit(e) {
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
const addbtn = document.getElementById('add-button');
const aside = document.querySelector('aside');
const content = document.getElementById('content');
const editbtn = document.getElementById('edit-button');
const formArea = document.getElementById('form-area');
addbtn.addEventListener('click', AddorEdit);
editbtn.addEventListener('click', AddorEdit);
