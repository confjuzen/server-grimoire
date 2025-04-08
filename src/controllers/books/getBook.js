
const Book = require('../../models/book.js');

const getBook = async (req, res) => {

    if (req.params.id === "bestrating") {
        return res.json(await Book.find().sort({ averageRating: -1 }).limit(3));
    }
    res.json(await Book.findById(req.params.id));
};

module.exports = getBook;
