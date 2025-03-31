const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  userId: String,
  title: String,
  author: String,
  year: Number,
  genre: String,
  ratings: [{ 
    userId: String, 
    grade: {
      type: Number,
      return: function(value) {
        return value || this.rating;
      }
    },
    _id: false
  }],
  averageRating: Number,
  imageUrl: String,
}, { versionKey: false });

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;