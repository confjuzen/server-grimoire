const Book = require("../schemas/book.js");
const processImage = require("../services/processImage.js");

const postBook =  async (req, res) => {
  console.log("log req.file2",req.file);
  console.log("log req.body2",req.body);
  console.log("log req.body.book2",req.body.book);
  const bookData = JSON.parse(req.body.book);
  const book = await new Book({ ...bookData, userId: req.user.sub }).save();
  const bookId = book._id.toString();
  book.imageUrl = await processImage(req.file.buffer, bookId);
  await book.save();
  console.log("log book updated url",book);
  res.status(200).json({ message: 'Objet modifié !' })
};

module.exports = postBook;
