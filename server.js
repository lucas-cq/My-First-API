// Install modules
const { request } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { stringify } = require('qs')
const dotenv = require('dotenv').config()

//const cars = require('./models/gallery.js')

/* ******************************* */
/* THIS WILL GO INTO MODEL FOLDER! */
/* ******************************* */

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

// Endpoint for the API
app.get('/api/cars', async (req, res) => {
  try {
  const cars = await Car.find()
  res.send(cars)
  } catch(err) {
    res.send({error: '404 File not found'})
  }
})

app.get('/api/cars/:id', async (req, res) => {
  try {
  const car = await Car.findOne({id: req.params.id})
  if (!car) {
    throw new Error('Car not found')
  }
  res.send(car)
  } catch(err) {
    res.send({error: '404 Car not found'})
  }
})

app.use(express.static('./public'))

// Handle 404 errors with middleware
app.use((req, res) => {
  if (req.url.startsWith('/api')) {
    res.status(404)
    res.send({error: '404: File not found'})
  } else {
    res.status(404).redirect('/404.html')
  }
})

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})