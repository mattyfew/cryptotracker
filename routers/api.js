const express = require('express')
  router = express.Router()
const controllers = require('../controllers')

router.get('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if(controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource"
    })
    return
  }

  controller.get(req.query)
  .then((res) => {
    res.json({
      confirmation: 'success',
      results: res
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: err
    })
  })
})

router.get('/:resource/:id', (req, res) => {
  const resource = req.params.resource
  const id = req.params.id
  const controller = controllers[resource]
  if(controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource"
    })
    return
  }

  controller.getById(id)
  .then((res) => {
    res.json({
      confirmation: 'success',
      results: res
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: 'Not found'
    })
  })
})


router.post('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  if(controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource"
    })
    return
  }

  controller.post(req.body)
  .then((res) => {
    res.json({
      confirmation: 'success',
      results: res
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: err
    })
  })
})

module.exports = router
