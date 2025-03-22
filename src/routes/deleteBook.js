const Book = require("../schemas/book.js");
const fs = require('fs');
const path = require('path');

const { DOMAIN, ROOT } = require("../config");


const deleteBook =  async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "no Book" });
    if (book.imageUrl) {
      const imgPath = path.join(ROOT, book.imageUrl.replace(DOMAIN, ''));
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await Book.deleteOne({ _id: book._id });
    res.json({ message: "Book deleted" });
};

module.exports = deleteBook;