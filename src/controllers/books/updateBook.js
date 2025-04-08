const processImage = require("../../utils/processImage.js");
const Book = require("../../models/book.js");

const updatedBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.bookId);

    let updatedBookData

    if (req.file && req.file.mimetype.startsWith('image/')){
      updatedBookData = JSON.parse(req.body.book);
      const bookId = book._id.toString();
      updatedBookData.imageUrl = await processImage(req.file.buffer, bookId);
    }

    if (!req.file) {
      updatedBookData = req.body;
    }

    await Book.findByIdAndUpdate(
      req.params.bookId, 
      { $set: updatedBookData }, 
      { new: true, runValidators: true }
    );
    
    res.status(200).json({message: 'book updated'});
  } catch (error) {
    res.status(400).json({ message: "missing fields" });
  }
};

module.exports = updatedBook;
