let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead, book_id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.book_id = book_id;
  }

  info() {
    let description = "";
    description =
      this.title + " by " + this.author + ", " + this.pages + " pages, ";
    if (this.isRead) {
      description = description + " already read.";
    } else {
      description = description + " not read yet.";
    }
    return description;
  }
}

function addBookToLibrary(title, author, pages, isRead, book_id) {
  const newbook = new Book(title, author, pages, isRead, book_id);
  myLibrary.push(newbook);
  return newbook;
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

//set the textContent of the td and button elements in the DOM according to the book.isRead status
function setReadStatus(td, button, book) {
  if (book.isRead) {
    td.textContent = "Yes";
    button.textContent = "No";
  } else {
    td.textContent = "No";
    button.textContent = "Yes";
  }
}

//add a new line about the book to the HTML table
function newLineToHTML(book, index) {
  const table = document.querySelector("table");
  const attributeName = "data-indexNumber";
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const td6 = document.createElement("td");
  const buttonToggle = document.createElement("button");
  const buttonRemove = document.createElement("button");

  td1.textContent = book.title;
  td2.textContent = book.author;
  td3.textContent = book.pages;
  setReadStatus(td4, buttonToggle, book); //set the textContent of the td and button elements in the DOM according to the book.isRead status
  buttonToggle.classList.add("toggle");
  buttonToggle.addEventListener("click", onButtonClick);
  buttonRemove.classList.add("remove");
  buttonRemove.addEventListener("click", onButtonClick);
  buttonRemove.textContent = "Remove";
  td5.appendChild(buttonToggle);
  td6.appendChild(buttonRemove);

  tr.setAttribute(attributeName, index.toString());
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  table.appendChild(tr);
}

function recreateHTMLTable() {
  const trAll = document.querySelectorAll("[data-indexnumber]");
  trAll.forEach((tr) => tr.remove());
  render();
}

//add the books in myLibrary to the HTML table
function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    newLineToHTML(myLibrary[i], i);
    console.log(myLibrary[i].info());
  }
}

//event handler for the toggle buttons, which toggle the isRead status of the books
function toggleRead(button) {
  const td5 = button.parentNode;
  const tr = td5.parentNode;
  const index = tr.getAttribute("data-indexnumber");
  const td4 = tr.children[3];
  const book = myLibrary[index];

  book.isRead = !book.isRead;
  setReadStatus(td4, button, book); //set the textContent of the td and button elements in the DOM 
                                    // according to the book.isRead status
  updateBook(book);
}

function removeBook(button) {
  const td6 = button.parentNode;
  const tr = td6.parentNode;
  const index = tr.getAttribute("data-indexnumber");

  const id = myLibrary[index].book_id;
  deleteBook(id)
    .then(() => {
      removeBookFromLibrary(index);
      recreateHTMLTable();
    });
}

function hideForm(button) {
  const form = document.querySelector("form");
  form.classList.add("hidden");
  button.classList.remove("hidden");
}

function showForm(button) {
  const form = document.querySelector("form");
  form.classList.remove("hidden");
  button.classList.add("hidden");
}

function deleteFormInputs() {
  const form = document.querySelector("form");
  inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

function submitForm(button) {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#yes").checked;
  const form = document.querySelector("form");

  const index = myLibrary.length;
  //returns if the form is invalid
  if (!form.checkValidity()) return;

  createBook({title, author, pages, isRead})
    .then((json) => {
      const id = json.id;
      pages = pages || 0;
      const newbook = addBookToLibrary(title, author, pages, isRead, id);
      newLineToHTML(newbook, index);
      hideForm(button);
    });
}

//general event handler for all the buttons for the click event
function onButtonClick(e) {
  const button = e.target;
  if (button.classList.contains("toggle")) {
    toggleRead(button);
  } else if (button.classList.contains("remove")) {
    removeBook(button);
  } else if (button.id == "cancel") {
    hideForm(newBookButton);
  } else if (button.id == "submit") {
    submitForm(newBookButton);
  } else if (button.id == "new-book") {
    deleteFormInputs();
    showForm(button);
  }
}

const BOOK_URL = "https://alexerdei-team.us.ainiro.io/magic/modules/books/book";

//CRUD (Create, Read, Update, Delete) operations
function readLibrary() {
  fetch(BOOK_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response is not OK!");
      } 
      return res.json();
    })
    .then((json) => {
      myLibrary = [];
      let book = {};
      const books = json;
      const len = books.length;
      let isRead = false;
      for (let i = 0; i < len; i++) {
        book = books[i];
        if (book.is_read === 1) isRead = true;
          else isRead = false;
          addBookToLibrary(book.title, book.author, book.pages, isRead, book.book_id);
      }
      render();
      hideForm(newBookButton);
    })
    .catch((err) => console.error(err));
}

function updateBook(book) {
  const payload = {
    title: book.title,
    author: book.author,
    pages: book.pages,
    book_id: book.book_id,
    is_read: Number(book.isRead)
  }
  fetch(BOOK_URL, 
    { 
      method: "PUT",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(payload) 
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response is not OK!");
      } 
      return res.json();
    })
    .catch((err) => console.error(err))
}

function createBook(book) {
  const payload = {
    title: book.title,
    author: book.author,
    pages: book.pages || 0,
    is_read: Number(book.isRead)
  }
  return fetch(BOOK_URL, 
    { 
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(payload) 
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response is not OK!");
      } 
      return res.json();
    })
    .catch((err) => console.error(err))
} 

function deleteBook(id) {
  const url = `${BOOK_URL}?book_id=${id}`;
  return fetch(url, 
    { 
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}, 
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response is not OK!");
      } 
      return res.json();
    })
    .catch((err) => console.error(err))
}

//main program
const cancelButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#submit");
const newBookButton = document.querySelector("#new-book");
cancelButton.addEventListener("click", onButtonClick);
submitButton.addEventListener("click", onButtonClick);
newBookButton.addEventListener("click", onButtonClick);

readLibrary();
