const Book = require('../schemas/book.js');

const getBooks = (async (req, res) => {
    console.log("log books", req);

    res.json(await Book.find());
});

module.exports = getBooks;