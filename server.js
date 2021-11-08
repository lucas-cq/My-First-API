// Install modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const cars = require('./models/gallery.js')


// Endpoint for the API
app.get('/api/cars', (req, res) => {
  res.send(cars)

  if (typeof cars !== 'undefined' && Array.isArray(cars)) {
    res.send(cars)
  } else {
    res.status(404)
    res.send({error: '404: File Not Found'})
  }

})

app.get('/api/cars/:id', (req, res) => {
  let galleryItem

  if (typeof cars !== 'undefined' && Array.isArray(cars)) {
    galleryItem = cars.find(item => Number(req.params.id) === item.id)
  } else {
    galleryItem = null
  }

   // Use Array.find() here
  if (typeof galleryItem === 'object' && galleryItem !== null) {
    res.send(galleryItem)
  } else {
    res.status(404)
    res.send({error: '404: File Not Found'})
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