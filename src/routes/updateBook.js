const updatedBook = async (req, res) => {
    const bookData = JSON.parse(req.body.book);
    const book = await findById(req.params.bookId);
    book = bookData
    const bookId = book._id.toString();
   
   // book.imageUrl = await processImage(req.file.buffer, bookId);
  
    await book.save();
    console.log("log book updated url",book);
    res.json({
      message: "Book Added",
    });
};
    
module.exports = updatedBook;
  