const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  token: String
})

module.exports = mongoose.model('user', userSchema)
console.log("user schema created");