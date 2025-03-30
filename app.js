const myLibrary = [];

const addBook = document.getElementById('addBook');

const form = document.getElementById('form');

const close = document.getElementById('close')

// the book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}

// take a book and add it to the library
function addBookToLibrary(){
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayForm(){
    form.style.display = 'flex'
}

function closeForm(){
    form.style.display = 'none'
}