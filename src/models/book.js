const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [{ 
    userId: { type: String, required: true },
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