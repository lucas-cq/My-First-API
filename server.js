// Initial modules for express & dotenv
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/api')

app.use(router) // Uses Routers from api.js

app.use(express.static('public')) // Serves static html

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