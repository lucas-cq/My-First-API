// Install modules
const express = require('express')
const app = express()

const cars = require('./data/gallery.js')

// Dynamic JSON Endpoint
app.get('/api/cars', function(req, res) {
  res.send(cars)

  if (typeof cars !== 'undefined' && Array.isArray(cars)) {
    res.send(cars)
  } else {
    res.status(404)
    res.send({error: 'File Not Found'})
  }

})

app.get('/api/cars/:id', function(req, res) {
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
    res.send({error: 'File not found'})
  }
})

// Handle 404 errors with middleware
app.use(function(req, res) {
  if (req.url.startsWith('/api')) {
    res.status(404)
    res.send({error: 'File not found'})
  } else {
    res.status(404)
    res.send('<h1>404: File Not Found</h1>')
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});