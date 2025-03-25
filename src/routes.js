const express = require('express');
const router = express.Router();

const logIn = require('./routes/login.js');
const signUp = require('./routes/signUp.js');

const getBooks = require('./routes/getBooks.js');
const getBook = require('./routes/getBook.js');
const deleteBook = require('./routes/deleteBook.js');
const postBook = require('./routes/postBook.js');
const rateBook = require('./routes/rateBook.js');
const updateBook = require('./routes/updateBook.js');

const verifyToken = require('./services/verifyToken.js');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.post('/auth/login', logIn);
router.post('/auth/signup', signUp);

router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.delete('/books/:bookId', verifyToken, deleteBook);
router.post('/books', verifyToken, upload.single('image'), postBook);
router.post('/books/:bookId/rating', verifyToken, rateBook);
router.put('/books/:bookId', verifyToken, upload.single('image'), updateBook);

module.exports = router;