const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')
const cookieSession = require("cookie-session")
const cors = require("cors")

const index = require('./routers/index')
const authenticate = require('./routers/auth')
const api = require('./routers/api')
const exchanges = require('./routers/exchanges')
const wallets = require('./routers/wallets')

// mongoose.createConnection('mongodb://localhost:27017/cryptotracker')
mongoose.connect('mongodb://localhost:27017/cryptotracker', {useMongoClient: true}, function(err, res) {
  if(err) {
    console.log("DB Connection fail", err)
  } else {
    console.log("DB Connection Success")
  }
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
});

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cookieSession({
    secret: "ferferfef",
    maxAge: 1000 * 60 * 90
}))

app.set('superSecret', config.secret)

app.use('/', index)
app.use('/authenticate', authenticate)
app.use('/api', api)
app.use('/exchanges', exchanges)
app.use('/wallets', wallets)


app.use((req, res, next) => {
  const token = req.session.token || req.body.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if(err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token'
          })
        } else {
          req.decoded = decoded
          next()
        }
      }
    )
  } else {
    if (req.url === '/login') {
      next()
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      })
    }
  }
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})
