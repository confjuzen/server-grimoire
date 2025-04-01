const Book = require("../../models/book.js");
const processImage = require("../../utils/processImage.js");

const postBook =  async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'missing image' });

  const bookData = JSON.parse(req.body.book);
  try {
    const book = await new Book({ ...bookData, userId: req.user.sub }).save();
    const bookId = book._id.toString();
    book.imageUrl = await processImage(req.file.buffer, bookId);
    await book.save();
    console.log("log: book updated",book);
    res.status(200).json({ message: 'book updated' })
  }
  catch (err) {
    console.log("log missing fields or incorect file format:", err);
    res.status(400).json({ message: 'missing or incorect file format' });
  }
  
};


module.exports = postBook;
