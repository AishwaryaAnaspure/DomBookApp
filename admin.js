const loginData = JSON.parse(localStorage.getItem('loginData'));
if (!loginData || loginData.email !== 'admin@empher.com') {
    alert('Admin not logged in');
    window.location.href = 'index.html';
}
const bookGrid = document.getElementById('booksGrid');
const addBookForm = document.getElementById('addBookForm');
async function fetchBooks() {
    const response = await fetch('http://localhost:3000/books');
    const books = await response.json();
    displayBooks(books);
}
function displayBooks(books) {
    booksGrid.innerHTML = '';
    books.forEach((book) => {
        const bookCard =
            document.craeteElement('div');
        bookCard.className = 'bookCard';
        bookCard.innerHTML = `
    <h4>${book.title}</h4>
    <p> Author: ${book.author} </p>
    <p> Category: ${book.category}</p>
    <p> Available: ${book.isAvailable}</p>
    <button onclick="verifyBook(${book.id})" $ {book.isVerified ? 'disabled' : ''}>
        Verify Book
        </button>
        <button onclick="deleteBook(${book.id})">Delete Book </button>`;
        booksGrid.appendChild(bookCard);
    });
}
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const catgory = document.getElementById('catgory').value;
    const bookData = { title, author, category, isAvailable: true, isVerified: false };
    const response = await fetch('http://localhost:3000/books'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(bookData),
});
if (response.ok) {
    alert('Book Added Successfully');
    fetchBooks();
}
});
async fucntion verifyBook(id){
    if (confirm('Are you sure to verify?')) {
        const reponse = await fetch('http://localhost:3000/books/${id}', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isVerified: true }),
        });
        if (response.ok)
            fetchBooks();
    }
}
async function deleteBook(id) {
    if (confirm('Are you sure to delete?')) {
        const response = await fetch('http://localhost:3000/books/$(id)', {
            method: 'DELETE',
        });
        if (response.ok)
            fetchBooks();
    }
}
fetchBooks();
