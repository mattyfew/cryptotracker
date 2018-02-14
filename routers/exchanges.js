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

function queryExchangesForBalances(exchanges) {
    let promises = []
    exchanges.forEach(exchange => {
        promises.push(exchangeGetters[exchange.name](exchange))
    })
    return Promise.all(promises)
        .then(exchangeInfoArr => {
            console.log(exchangeInfoArr);

            let newObj = {}
            for (var i = 0; i < exchangeInfoArr.length; i++) {
                newObj[ Object.keys(exchangeInfoArr[i])[0] ] = exchangeInfoArr[i]
            }
            return newObj
        })
        .catch(e => console.log("There was an error in queryExchangesForBalances", e))
}

router.get('/get-exchange-info', (req, res) => {
    exchangeController.getExchangeInfo({ "referenceMongoID" : "5a775c6ef1d9c08160512b14" })
        .then(exchanges => {
            queryExchangesForBalances(exchanges)
                .then(results => {
                    res.json({ exchangeInfo: results })
                })
        })
})

module.exports = router

const exchangeGetters = {
    binance: function(exchange){
        return new Promise((resolve, reject) => {
            binance.options({
                'APIKEY': exchange.APIkey,
                'APISECRET': exchange.APIsecret,
                'recvWindow': 60000
            })

            binance.balance( balances => resolve({ binance: balances }))
        })
    },

    bitstamp: function(exchange) {
        return new Promise((resolve, reject) => {
            const bitstamp = new Bitstamp({
                apiKey: exchange.APIkey,
                apiSecret: exchange.APIsecret,
                clientId: exchange.clientId,
                timeout: 5000,
                rateLimit: true //turned on by default
            })

            console.log(bitstamp.getStats())
        })
    }
}
