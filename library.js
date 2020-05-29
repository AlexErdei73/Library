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

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Classical Mechanics', 'John Taylor', 786, true);
addBookToLibrary('Mathematical methodes in the physical sciences', 'Mary L. Boas', 793, true);
console.log(myLibrary[0]);
console.log(myLibrary[1]);
console.log(myLibrary[2]);