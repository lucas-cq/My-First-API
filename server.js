// Initial modules for express

const express = require('express')
const app = express()
const Car = require('./models/seeds/items.js') // Fetches mongoose from models/items.js

app.use(express.static('./public')) // Serves static html

// Endpoint for the API
app.get('/api/cars', async (req, res) => {
  try {
  const cars = await Car.find()
  res.send(cars)
  } catch(err) {
    res.send({error: '404 File not found'})
  }
})

// Endpoint for a single car
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

// If an api is not entered, or found it will display the 404 page
app.use((req, res) => {
  if (req.url.startsWith('/api')) {
    res.status(404)
    res.send({error: '404: File not found'})
  } else {
    res.status(404).redirect('/404.html')
  }
})

// Starts the server, nothin new
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})