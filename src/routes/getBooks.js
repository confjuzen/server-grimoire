const Book = require('../schemas/book.js');

const getBooks = (async (req, res) => {
    res.json(await Book.find());
});

module.exports = getBooks;