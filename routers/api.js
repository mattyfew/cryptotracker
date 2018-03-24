const express = require('express'),
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
  .then((results) => {
    res.json({
      confirmation: 'success',
      results
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
  .then((results) => {
    res.json({
      confirmation: 'success',
      results
    })
  })
  .catch((err) => {
    console.log("error in API get resource by id", err)
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
  .then((results) => {
    res.json({
      confirmation: 'success',
      results
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: err
    })
  })
})

router.get('/search/:resource/:attribute/:value', (req, res) => {
  const resource = req.params.resource
  const attribute = req.params.attribute
  const value = req.params.value
  const controller = controllers[resource]

  if(controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource"
    })
    return
  }

  controller.find(attribute, value)
  .then((attribute) => {
    res.json({
      confirmation: 'success',
      result: attribute
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: 'Not found'
    })
  })
})


router.post('/update/:resource', (req, res) => {
  const resource = req.params.resource
  const attribute = req.body.attribute
  const value = req.body.value
  const controller = controllers[resource]

  if(controller == null) {
    res.json({
      confirmation: "fail",
      message: "Invalid Resource"
    })
    return
  }

  controller.findAndUpdate(attribute, value)
  .then((attribute) => {
    res.json({
      confirmation: 'success',
      result: attribute
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: 'Not found'
    })
  })
})

module.exports = router
