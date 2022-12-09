const mongoose = require('mongoose')
const booksSchema = new mongoose.Schema({
  book: String,
  author: String,
  booksmith: String,
})

module.exports = mongoose.model('books', booksSchema)
console.log("books schema created");