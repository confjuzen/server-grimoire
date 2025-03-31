const express = require('express');
const router = express.Router();

const logIn = require('./controllers/auth/login.js');
const signUp = require('./controllers/auth/signUp.js');

const getBooks = require('./controllers/books/getBooks.js');
const getBook = require('./controllers/books/getBook.js');
const deleteBook = require('./controllers/books/deleteBook.js');
const postBook = require('./controllers/books/postBook.js');
const rateBook = require('./controllers/books/rateBook.js');
const updateBook = require('./controllers/books/updateBook.js');

const auth = require('./middlewares/auth.js');
const upload = require('./middlewares/upload.js');

router.post('/auth/login', logIn);
router.post('/auth/signup', signUp);

router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.delete('/books/:bookId', auth, deleteBook);
router.post('/books', auth, upload.single('image'), postBook);
router.post('/books/:bookId/rating', auth, rateBook);
router.put('/books/:bookId', auth, upload.single('image'), updateBook);

module.exports = router;