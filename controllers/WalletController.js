const Wallet = require('../db/models/wallet')

module.exports = {
  get: (params) => {
    return new Promise((resolve, reject) => {
      Wallet.find(params, (err, wallet) => {
        if(err) {
          reject(err)
        } else {
          resolve(wallet)
        }
      })
    })
  },

  getWalletInfo: (params) => {
    return new Promise((resolve, reject) => {
      Wallet.find(params)
        .populate('wallets')
        .then(result => {
            resolve(result)
        })
        .catch (e => reject(e))
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Wallet.findById(id, (err, wallet) => {
        if(err) {
          reject(err)
        } else {
          resolve(wallet)
        }
      })
    })
  },

  findAndUpdate: (attribute, value) => {
    return new Promise((resolve, reject) => {
      Wallet.findOneAndUpdate(
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
      Wallet.findOne({[attribute]: value}, (err, model) => {
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
      Wallet.create(params, (err, wallet) => {
        if(err) {
          reject(err)
        } else {
          resolve(wallet)
        }
      })
    })
  }
}
