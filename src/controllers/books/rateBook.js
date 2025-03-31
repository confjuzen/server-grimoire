const Book = require('../../models/book.js');
const calculateRating = require('../../utils/calculateRating.js');

const rateBook = async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    book.ratings.push({ userId: req.user.sub, grade: req.body.rating });
    await book.save();
    await calculateRating(book._id);
    const updatedBook = await Book.findById(book._id);
    res.json(updatedBook);
};

module.exports = rateBook;