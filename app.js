const myLibrary = [];

// the book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
}


Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

// take a book and add it to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const library = document.getElementById("library");
    library.innerHTML = ""; // Clear previous display

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;

        card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
        <button class="toggle-read">Toggle Read</button>
        <button class="remove">Remove</button>
      `;

        // Toggle read status
        card.querySelector(".toggle-read").addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        // Remove book
        card.querySelector(".remove").addEventListener("click", () => {
            const index = myLibrary.findIndex((b) => b.id === book.id);
            myLibrary.splice(index, 1);
            displayBooks();
        });

        library.appendChild(card);
    });
}

// Handle modal/form
const dialog = document.getElementById("bookDialog");
document.getElementById("newBookBtn").addEventListener("click", () => dialog.showModal());


document.getElementById("bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const pages = parseInt(form.pages.value);
    const read = form.read.checked;

    addBookToLibrary(title, author, pages, read);
    form.reset();
    dialog.close();
});

// Close the dialog
dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!clickedInDialog) {
        dialog.close();
    }
});

