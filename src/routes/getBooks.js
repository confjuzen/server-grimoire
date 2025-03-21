const app = require('../app');
const mongoose = require('mongoose');
const Book = require('../schemas/book');

app.get('/api/books', async (req, res) => {
    res.json(await Book.find());
  });
