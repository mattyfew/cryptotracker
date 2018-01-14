const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')

mongoose.connect('mongodb://localhost:27017/cryptotracker')

const nick = {
  name :'nick szabo',
  password: 'password',
  admin: true
}

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('superSecret', config.secret)

app.post('/authenticate', (req, res) => {
  if(req.body.password === nick.password) {
    // TODO check db for valid credentials and replace placeholder nick
    const payload = {
      name: nick.name
    }

    const token = jwt.sign(
      payload,
      app.get('superSecret'),
      {expiresIn: 1440}
    )
    res.json({
      success: true,
      message: 'Authenticated!',
      token: token
    })
  } else {
    res.json({
      success: false,
      message: 'Authentication failed'
    })
  }
})

// middleware to check for authenticated user
app.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  // decode the token:
  if(token) {
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
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    })
  }
})

app.use(require('./routers/login'))
app.use(require('./routers/exchanges'))


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})
