const express = require('express')
  router = express.Router()


const nick = {
  name :'nick szabo',
  password: 'password',
  admin: true
}

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

module.exports = router
