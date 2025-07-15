import express from 'express';
import {
  createBook,
  readBook,
  updateBook,
  deleteBook,
  getBooks,
} from '../controllers/bookController';

const router = express.Router();

// Create a new book
router.post('/create', createBook);

// Get all books
router.get('/', getBooks);

// Get a specific book by ID
router.get('/:id', readBook);

// Update a specific book by ID
router.put('/:id', updateBook);

// Delete a specific book by ID
router.delete('/:id', deleteBook);

export default router;
