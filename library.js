function book(title, author, pages, isRead){
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

const mybook = new book('The Hobbit', 'J.R.R. Tolkien', 295, false);
console.log(mybook.info());