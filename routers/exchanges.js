const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Exchange = require(path.resolve(__dirname, '..', './db/models/exchange')),
    exchangeController = require(path.resolve(__dirname, '..', './controllers/ExchangeController')),
    userController = require(path.resolve(__dirname, '..', './controllers/UserController')),

    // Poloniex = require('poloniex-api-node'),
    binance = require('node-binance-api'),
    { Bitstamp } = require('node-bitstamp');

router.post('/add-new-exchange', (req, res) => {
    // console.log("about to add new exchange", req.body);
    // console.log("the session", req.session);

    exchangeController.post({
        referenceMongoID: req.session.id,
        name: req.body.exchange,
        APIkey: req.body.key,
        APIsecret: req.body.secret,
        customerId: req.body.customerId || null
    })
    .then(newExchange => {
        console.log("New exchange added to DB", newExchange)

        userController.getById(req.session.id)
        .then(user => {
            user.exchanges.push(newExchange._id)
            user.save()

            res.json({ success: true, newExchange })
        })
    })
    .catch(err => console.log("There was an error in POST /exchanges/add-new-exchange", err))
})

router.get('/get-exchange-info', (req, res) => {
    console.log('SESSION INFO: ', req.session)
    res.json({ success: true })









  // console.log('SESSION INFO: ', req.session)
  //   // CODE DEBT: need to change this to read from the logged in userId
  //   // also need to rewrite the flow of this router,
  //   // I need to have mongoose query for the userId of the metaMask ID,
  //   // will we be saving the MetaMask userId in a session?
  //   // after I get that, then I query for all the exchanges associated to that account.
  //   // then, get info for each exchange, and then send. can use populate for this
  //   // NOTE: i should use Promise.all to run each of the "getExchangeInfo" functions
  //
  //   User.findOne({ _id: 'testtest'})
  //       .populate('exchanges')
  //       .then(userInfo => {
  //           // should have userInfo AND the exchange info populated
  //           // userInfo.exchanges will be an array of objects based on exchange schema
  //           // TODO write logic for "if this exchange is in the array,
  //           // run the getThatExchangeInfo function"
  //           console.log(userInfo.exchanges);
  //
  //
  //       })
  //
  //   Exchange.findOne({ _id: '5a5e68ed5ce167091a518fa2' }, (err, exchangeInfo) => {
  //       if (err) console.log("error in Exchange.findOne: ", err)
  //
  //       // CODE DEBT: Need to organize how to query each API. Should it be client-side?
  //       // getBitstampInfo()
  //
  //       getBinanceInfo(exchangeInfo.APIkey, exchangeInfo.APIsecret)
  //           .then( binanceBalances => {
  //               console.log(binanceBalances);
  //               res.json({
  //                   success: true,
  //                   exchangeInfo: {
  //                       binance: binanceBalances
  //                   }
  //               })
  //           })
  //           .catch(e => console.log("Error while getting Binance info: ", e))
  //   })
})

function getBinanceInfo(apiKey, apiSecret){
    return new Promise((resolve, reject) => {
        binance.options({
            'APIKEY': apiKey,
            'APISECRET': apiSecret,
            'recvWindow': 60000
        })

        binance.balance( balances => resolve(balances))
    })
}

function getBitstampInfo(apiKey, apiSecret, clientId) {
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


router.get('/get-binance-info', (req, res) => {
    console.log("GET /get-binance-info")
})

module.exports = router



// userSchema.methods.getExchangeInfo = function() {
//
//     this.models.exchanges.forEach((exchange, i) => {
//         const name = exchange.name
//         const apiKey = exchange.apiKey
//         const apiSecret = exchange.apiSecret
//         let promises
//         let promise
//
//         if (name === 'bitstamp') {
//             const customerId = exchange.customerId
//             promise = exchangeGetters[name](apiKey, apiSecret, customerId)
//         } else {
//             promise = exchangeGetters[name](apiKey, apiSecret)
//         }
//         promises.push(promise)
//     })
//
//     return Promise.all(promises)
//            .then(results => {
//                console.log(results);
//                return results
//            })
//            .catch(e => console.log("There was an error in getExchangeInfo", e))
// }
//
//
//
// const exchangeGetters = {
//     binance: function(apiKey, apiSecret){
//         return new Promise((resolve, reject) => {
//             binance.options({
//                 'APIKEY': apiKey,
//                 'APISECRET': apiSecret,
//                 'recvWindow': 60000
//             })
//
//             binance.balance( balances => resolve(balances))
//         })
//     },
//
//     bitstamp: function(apiKey, apiSecret, clientId) {
//         return new Promise((resolve, reject) => {
//             const bitstamp = new Bitstamp({
//                 apiKey,
//                 apiSecret,
//                 clientId,
//                 timeout: 5000,
//                 rateLimit: true //turned on by default
//             })
//
//             console.log(bitstamp.getStats())
//         })
//     }
// }
