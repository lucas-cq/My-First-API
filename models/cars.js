// Initial modules for mongoose
const mongoose = require('mongoose')

// Connects to the mongoose URL
mongoose.connect(
  process.env.MONGODB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
)
.then(() => {
  console.log('Connected to DB...')
})
.catch((err) => {
  console.log(err)
})

// The schema for my api
const gallerySchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  pathURL: String,
  linkURL: String,
  credit: String,
  creditURL: String,
  date: String
})

const Car = mongoose.model('Car', gallerySchema)

// Exports this file to server.js
module.exports = Car