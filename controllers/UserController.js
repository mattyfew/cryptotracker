const User = require('../db/models/user')

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      User.find(params, (err, users) => {
        if(err) {
          reject(err)
        } else {
          resolve(users)
        }
      })
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      User.findById(id, (err, user) => {
        if(err) {
          reject(err)
        } else {
          resolve(user)
        }
      })
    })
  },

  findAndUpdate: (attribute, value) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate(
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
      User.findOne({[attribute]: value}, (err, model) => {
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
      // TODO logic to hash important info
      User.create(params, (err, user) => {
        if(err) {
          reject(err)
        } else {
          resolve(user)
        }
      })
    })
  }
}
