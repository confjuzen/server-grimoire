const Book = require('../schemas/book.js');


const calculateRating = async (bookId) => {
    const book = await Book.findById(bookId);
    if (!book) return;
    const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);
    book.averageRating = book.ratings.length ? Math.round((total / book.ratings.length) * 10) / 10 : 0;
    await book.save();
};

module.exports = calculateRating;