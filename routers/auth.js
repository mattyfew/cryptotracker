const jwt = require('jsonwebtoken')
const config = require('../config')
const express = require('express')
  router = express.Router()

router.post('/', (req, res) => {
  if(req.body.id) {
    const payload = {
      id: req.body.id
    }

    const token = jwt.sign(
      payload,
      config.secret,
      {expiresIn: 30000}
    )
    req.session.token = token
    req.session.id = req.body.id
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

router.get('/get-user-info', (req, res) => {
    if (!req.session.id) {
        return res.redirect('/')
    }
    res.json({
        addressUser: req.session.id
    })
})

module.exports = router
