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
