const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// mongoose.connect('mongodb://localhost:27017/cryptotracker')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(require('./routers/login'))
app.use(require('./routers/exchanges'))

// route protection goes here
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})
