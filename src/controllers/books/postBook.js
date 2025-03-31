const Book = require("../../models/book.js");
const processImage = require("../../utils/processImage.js");

const postBook =  async (req, res) => {

  const bookData = JSON.parse(req.body.book);
  const book = await new Book({ ...bookData, userId: req.user.sub }).save();
  const bookId = book._id.toString();
  book.imageUrl = await processImage(req.file.buffer, bookId);
  await book.save();
  console.log("log: book updated",book);
  res.status(200).json({ message: 'book updated' })
};

module.exports = postBook;
