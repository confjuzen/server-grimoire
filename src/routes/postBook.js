const Book = require("../schemas/book.js");
const processImage = require("../services/processImage.js");
//const verifyToken = require("../services/verifyToken.js");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { request } = require("express");

//const postBook = ( verifyToken, upload.single('image'), async (req, res) => {
//  const bookData = JSON.parse(req.body.book);
//  const book = await new Book({ ...bookData, userId: req.user.sub }).save();
//  const bookId = book._id.toString();
//  book.imageUrl = await processImage(req.file.buffer, bookId);
//  await book.save();
//  res.json({
//    message: "Book Added",
//  });
//});

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const postBook = ( verifyToken, async (req, res) => {
  const bookData = JSON.parse(req.body.book);
  const book = await new Book({ ...bookData, userId: req.user.sub }).save();
//  const bookId = book._id.toString();
//  book.imageUrl = await processImage(req.file.buffer, bookId);
  await book.save();
  res.json({
    message: "Book Added",
  });
});

module.exports = postBook;
