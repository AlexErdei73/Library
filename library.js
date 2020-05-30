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
    const button = document.createElement('button');

    td1.textContent = book.title;
    td2.textContent = book.author;
    td3.textContent = book.pages;
    setReadStatus(td4, button, book);   //set the textContent of the td and button elements in the DOM according to the book.isRead status
    button.classList.add('toggle');
    button.addEventListener('click',toggleRead);
    td5.appendChild(button);

    tr.setAttribute(attributeName, index.toString());
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    table.appendChild(tr);
}

function render(){
    for (let i = 0; i < myLibrary.length; i++) {
        newLineToHTML(myLibrary[i], i);
        console.log(myLibrary[i].info());
    }
}

function toggleRead(e) {
    const button = e.target;
    const td5 = button.parentNode;
    const tr = td5.parentNode;
    const index = tr.getAttribute('data-indexnumber');
    const td4 = tr.children[3];
    const book = myLibrary[index];

    book.isRead = !book.isRead;
    setReadStatus(td4, button, book);     //set the textContent of the td and button elements in the DOM according to the book.isRead status 
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Classical Mechanics', 'John Taylor', 786, true);
addBookToLibrary('Mathematical methodes in the physical sciences', 'Mary L. Boas', 793, true);
render();