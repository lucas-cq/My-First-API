//Initial modules for express
const express = require('express')
const router = express.Router()

const Car = require('../models/cars') // Fetches mongoose from models/items.js

// Endpoint for the API
router.get('/api/cars', async (req, res) => {
  try {
  const cars = await Car.find()
  res.send(cars)
  } catch(err) {
    res.send({error: '404 File not found'})
  }
})

// Endpoint for a single car
router.get('/api/cars/:id', async (req, res) => {
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

module.exports = router // Exports the routers for middle ware
