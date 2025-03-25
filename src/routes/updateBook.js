const processImage = require("../services/processImage.js");
const Book = require("../schemas/book.js");

const updatedBook = async (req, res) => {
  try {
    console.log("log req.file3", req.file);
    console.log("log req.body3", req.body);
    console.log("log req.body.book3", req.body.book);

    let book = await Book.findById(req.params.bookId);

    let updatedBookData


    if (req.file) {
      updatedBookData = JSON.parse(req.body.book);
      delete updatedBookData._id; 
      const bookId = book._id.toString();
      updatedBookData.imageUrl = await processImage(req.file.buffer, bookId);
    }

    if (!req.file) {
      updatedBookData = req.body;
      delete updatedBookData._id;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId, 
      { $set: updatedBookData }, 
      { new: true, runValidators: true } // Returns updated book and validates schema
    );

    console.log("log book updated", updatedBook);
    
    res.send('hi');
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updatedBook;
