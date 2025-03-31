const Book = require('../../models/book.js');

const getBooks = async (req, res) => {
    
    console.log("log: get books", req);

    res.json(await Book.find());
};

module.exports = getBooks;