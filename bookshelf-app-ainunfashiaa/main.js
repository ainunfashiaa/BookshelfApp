document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBook");
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");
    
    let books = JSON.parse(localStorage.getItem("books")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    function addBook(title, author, year, isComplete) {
        const bookId = +new Date();
        const book = { id: bookId, title, author, year: Number(year), isComplete };
        books.push(book);
        saveToLocalStorage();
        renderBooks();
    }

    function deleteBook(bookId) {
        books = books.filter(book => book.id !== bookId);
        saveToLocalStorage();
        renderBooks();
    }

    function toggleBookStatus(bookId) {
        books = books.map(book => 
            book.id === bookId ? { ...book, isComplete: !book.isComplete } : book
        );
        saveToLocalStorage();
        renderBooks();
    }

    function editBook(bookId) {
        const book = books.find(book => book.id === bookId);
        if (!book) return;

        const newTitle = prompt("Edit Judul Buku:", book.title);
        const newAuthor = prompt("Edit Penulis Buku:", book.author);
        const newYear = prompt("Edit Tahun Rilis:", book.year);

        if (newTitle && newAuthor && newYear) {
            books = books.map(b => 
                b.id === bookId ? { ...b, title: newTitle, author: newAuthor, year: Number(newYear) } : b
            );
            saveToLocalStorage();
            renderBooks();
        }
    }

    function searchBooks(query) {
        renderBooks(books.filter(book => book.title.toLowerCase().includes(query.toLowerCase())));
    }

    function renderBooks(filteredBooks = books) {
        incompleteBookList.innerHTML = "";
        completeBookList.innerHTML = "";

        filteredBooks.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.setAttribute("data-bookid", book.id);
            bookElement.setAttribute("data-testid", "bookItem");

            bookElement.innerHTML = `
                <h3 data-testid="bookItemTitle">${book.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear">Tahun: ${book.year}</p>
                <div>
                    <button data-testid="bookItemIsCompleteButton" style="font-family: 'Poppins', sans-serif">${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}</button>
                    <button data-testid="bookItemDeleteButton" style="font-family: 'Poppins', sans-serif">Hapus Buku</button>
                    <button data-testid="bookItemEditButton" style="font-family: 'Poppins', sans-serif">Edit Buku</button>
                </div>
            `;

            bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener("click", () => toggleBookStatus(book.id));
            bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener("click", () => deleteBook(book.id));
            bookElement.querySelector('[data-testid="bookItemEditButton"]').addEventListener("click", () => editBook(book.id));

            if (book.isComplete) {
                completeBookList.appendChild(bookElement);
            } else {
                incompleteBookList.appendChild(bookElement);
            }
        });
    }

    bookForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("bookFormTitle").value;
        const author = document.getElementById("bookFormAuthor").value;
        const year = document.getElementById("bookFormYear").value;
        const isComplete = document.getElementById("bookFormIsComplete").checked;

        addBook(title, author, year, isComplete);
        bookForm.reset();
    });

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = document.getElementById("searchBookTitle").value;
        searchBooks(query);
    });

    renderBooks();
});

document.body.style.fontFamily = "'Poppins', sans-serif";

document.querySelectorAll("input, button").forEach(el => {
    el.style.fontFamily = "'Poppins', sans-serif";
});

const header = document.querySelector("header");
header.style.backgroundColor = "#4A90E2";
header.style.color = "white";
header.style.textAlign = "center";
header.style.padding = "15px";
header.style.fontSize = "20px";

const sections = document.querySelectorAll("section");
sections.forEach(section => {
    section.style.backgroundColor = "white";
    section.style.margin = "20px auto";
    section.style.padding = "20px";
    section.style.borderRadius = "8px";
    section.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    section.style.width = "80%";
    section.style.maxWidth = "500px";
});

window.onload = function() {
    const submitButton = document.getElementById("bookFormSubmit");
    submitButton.style.width = "100%";
    submitButton.style.display = "block";
    submitButton.style.marginTop = "10px";
};

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.style.backgroundColor = "#4A90E2";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "10px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.fontSize = "14px";
    button.style.marginTop = "10px";
});

const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.style.width = "100%";
    input.style.padding = "8px";
    input.style.marginTop = "5px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "5px";
    input.style.boxSizing = "border-box";
});

const formLabels = document.querySelectorAll("label");
formLabels.forEach(label => {
    label.style.fontWeight = "bold";
    label.style.display = "block";
    label.style.marginTop = "10px";
});

const checkboxLabel = document.querySelector("label[for='inputBookIsComplete']");
const checkbox = document.querySelector("#inputBookIsComplete");
if (checkboxLabel && checkbox) {
    checkboxLabel.style.display = "inline";
    checkbox.style.marginLeft = "5px";
}

const searchContainer = document.querySelector("#searchBook");
if (searchContainer) {
    searchContainer.style.display = "flex";
    searchContainer.style.alignItems = "center";
    searchContainer.style.gap = "10px";

    const searchInput = document.querySelector("#searchBookTitle");
    if (searchInput) {
        searchInput.style.flexGrow = "1";
    }

    const searchButton = document.querySelector("#searchSubmit");
    if (searchButton) {
        searchButton.style.padding = "8px 15px";
    }
}

const bookLists = document.querySelectorAll("#incompleteBookshelfList, #completeBookshelfList");
bookLists.forEach(list => {
    list.style.backgroundColor = "transparent";
    list.style.padding = "0";
    list.style.borderRadius = "0";
    list.style.border = "none";
});

const bookTitles = document.querySelectorAll("h2");
bookTitles.forEach(title => {
    title.style.color = "#4A90E2";
    title.style.textAlign = "center";
});
