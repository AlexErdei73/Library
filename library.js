let myLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead,
    this.info = function(){
        let description = '';
        description = title + ' by ' + author + ', ' + pages + ' pages, '
        if (isRead) {
            description = description + ' already read.';
        } else {
            description = description + ' not read yet.';
        }
        return description;
    }
}

function addBookToLibrary(title, author, pages, isRead){
    const newbook = new Book(title, author, pages, isRead);
    myLibrary.push(newbook);
    return newbook;
}

function removeBookFromLibrary(index){
    myLibrary.splice(index, 1);
}

//set the textContent of the td and button elements in the DOM according to the book.isRead status
function setReadStatus(td, button, book){
    if (book.isRead) {
        td.textContent = 'Yes';
        button.textContent = 'No';
    } else {
        td.textContent = 'No';
        button.textContent = 'Yes';
    }
}

//add a new line about the book to the HTML table
function newLineToHTML(book, index){
    const table = document.querySelector('table');
    const attributeName = 'data-indexNumber';
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const buttonToggle = document.createElement('button');
    const buttonRemove = document.createElement('button');

    td1.textContent = book.title;
    td2.textContent = book.author;
    td3.textContent = book.pages;
    setReadStatus(td4, buttonToggle, book);   //set the textContent of the td and button elements in the DOM according to the book.isRead status
    buttonToggle.classList.add('toggle');
    buttonToggle.addEventListener('click',onButtonClick);
    buttonRemove.classList.add('remove');
    buttonRemove.addEventListener('click',onButtonClick);
    buttonRemove.textContent = 'Remove'
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

function removeLineFromHTML(index){
    const tr = document.querySelector('[data-indexnumber="' + index.toString() + '"]');
    tr.remove();
} 

//add the books in myLibrary to the HTML table
function render(){
    for (let i = 0; i < myLibrary.length; i++) {
        newLineToHTML(myLibrary[i], i);
        console.log(myLibrary[i].info());
    }
}

//event handler for the toggle buttons, which toggle the isRead status of the books
function toggleRead(button) {
    const td5 = button.parentNode;
    const tr = td5.parentNode;
    const index = tr.getAttribute('data-indexnumber');
    const td4 = tr.children[3];
    const book = myLibrary[index];

    book.isRead = !book.isRead;
    setReadStatus(td4, button, book);     //set the textContent of the td and button elements in the DOM according to the book.isRead status 
}

function removeBook(button){
    const td6 = button.parentNode;
    const tr = td6.parentNode;
    const index = tr.getAttribute('data-indexnumber');

    removeBookFromLibrary(index);
    removeLineFromHTML(index);
}

function hideForm(button){
    const form = document.querySelector('form');
    form.classList.add('hidden');
    button.classList.remove('hidden');
}

function showForm(button){
    const form = document.querySelector('form');
    form.classList.remove('hidden');
    button.classList.add('hidden');
}

function submitForm(button){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#yes').value;
    
    const index = myLibrary.length;
    //return if pages cannot be converted to an integer or negative number
    pages = parseInt(pages);
    if (isNaN(pages)) return
    if (pages < 0) return

    const newbook = addBookToLibrary(title, author, pages, isRead);
    newLineToHTML(newbook, index);
    hideForm(button);
}

//general event handler for all the buttons for the click event
function onButtonClick(e) {
    const button = e.target;
    if (button.classList.contains('toggle')) {
        toggleRead(button);
        console.log('toggle');
    } else if (button.classList.contains('remove')) {
        removeBook(button);
        console.log('remove');
    } else if (button.id == 'cancel') {
        hideForm(newBookButton);
    } else if (button.id == 'submit') {
        submitForm(newBookButton);
    } else if (button.id == 'new-book'){
        showForm(button);
    }
}

const cancelButton = document.querySelector('#cancel');
const submitButton = document.querySelector('#submit');
const newBookButton = document.querySelector('#new-book');
cancelButton.addEventListener('click', onButtonClick);
submitButton.addEventListener('click', onButtonClick);
newBookButton.addEventListener('click', onButtonClick);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Classical Mechanics', 'John Taylor', 786, true);
addBookToLibrary('Mathematical methodes in the physical sciences', 'Mary L. Boas', 793, true);
render();
hideForm(newBookButton);