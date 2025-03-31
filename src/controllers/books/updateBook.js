const processImage = require("../../utils/processImage.js");
const Book = require("../../models/book.js");

const updatedBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.bookId);

    let updatedBookData

    if (req.file) {
      updatedBookData = JSON.parse(req.body.book);
      const bookId = book._id.toString();
      updatedBookData.imageUrl = await processImage(req.file.buffer, bookId);
    }

    if (!req.file) {
      updatedBookData = req.body;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId, 
      { $set: updatedBookData }, 
      { new: true, runValidators: true }
    );

    console.log("log: book updated", updatedBook);
    
    res.status(200).json({message: 'book updated'});
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updatedBook;
