const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userID: { type: String, unique: true }, // public address
  email: { type: String, unique: true, lowercase: true },
  displayName: { type: String, unique: true, lowercase: false },
  exchanges: [{
    exchangeId: Schema.Types.ObjectId,
    ref: 'Exchange'
  }]
}, { timestamps: true })

userSchema.methods.getExchangeInfo = function() {

    this.models.exchanges.forEach((exchange, i) => {
        const name = exchange.name
        const apiKey = exchange.apiKey
        const apiSecret = exchange.apiSecret
        let promises
        let promise

        if (name === 'bitstamp') {
            const customerId = exchange.customerId
            promise = exchangeGetters[name](apiKey, apiSecret, customerId)
        } else {
            promise = exchangeGetters[name](apiKey, apiSecret)
        }
        promises.push(promise)
    })

    return Promise.all(promises)
           .then(results => {
               console.log(results);
               return results
           })
           .catch(e => console.log("There was an error in getExchangeInfo", e))
}

const ModelClass = mongoose.model('User', userSchema)

module.exports = ModelClass

const exchangeGetters = {
    binance: function(apiKey, apiSecret){
        return new Promise((resolve, reject) => {
            binance.options({
                'APIKEY': apiKey,
                'APISECRET': apiSecret,
                'recvWindow': 60000
            })

            binance.balance( balances => resolve(balances))
        })
    },

    bitstamp: function(apiKey, apiSecret, clientId) {
        return new Promise((resolve, reject) => {
            const bitstamp = new Bitstamp({
                apiKey,
                apiSecret,
                clientId,
                timeout: 5000,
                rateLimit: true //turned on by default
            })

            console.log(bitstamp.getStats())
        })
    }
}
