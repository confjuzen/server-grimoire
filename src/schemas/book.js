const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  userId: String,
  title: String,
  author: String,
  year: Number,
  genre: String,
  ratings: [{ 
    userId: String, 
    rating: Number,
    _id: false
  }],
  averageRating: Number,
  imageUrl: String,
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;