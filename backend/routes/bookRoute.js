const express = require("express");
const { createBook, readBook, updateBook, deleteBook, getBooks } = require("../controllers/bookController");

const router = express.Router();

// Route to create a new book
router.post('/createBook', createBook);

// Route to get all books
router.get('/', getBooks);

// Route to get a specific book by ID
router.get('/:id', readBook);

// Route to update a specific book by ID
router.put('/:id', updateBook);

// Route to delete a specific book by ID
router.delete('/:id', deleteBook);

module.exports = router;