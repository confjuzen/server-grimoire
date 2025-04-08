const Book = require('../../models/book.js');

const getBooks = async (req, res) => {
    
    res.json(await Book.find());
};

module.exports = getBooks;