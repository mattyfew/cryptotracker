const Exchange = require('../db/models/exchange')

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      Exchange.find(params, (err, exchange) => {
        if(err) {
          reject(err)
        } else {
          resolve(exchange)
        }
      })
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Exchange.findById(id, (err, exchange) => {
        if(err) {
          reject(err)
        } else {
          resolve(exchange)
        }
      })
    })
  },

  findAndUpdate: (attribute, value) => {
    return new Promise((resolve, reject) => {
      Exchange.findOneAndUpdate(
        {[attribute]: value},
        {[attribute]: value},
        {upsert: true, new: true},
        (err, model) => {
        if(err) {
          reject(err)
        } else {
          resolve(model)
        }
      })
    })
  },

  find: (attribute, value) => {
    return new Promise((resolve, reject) => {
      Exchange.findOne({[attribute]: value}, (err, model) => {
        if(err) {
          reject(err)
        } else {
          resolve(model)
        }
      })
    })
  },

  post: (params) => {
    return new Promise((resolve, reject) => {
      Exchange.create(params, (err, exchange) => {
        if(err) {
          reject(err)
        } else {
          resolve(exchange)
        }
      })
    })
  }
}
