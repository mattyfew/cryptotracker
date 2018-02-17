const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Exchange = require(path.resolve(__dirname, '..', './db/models/exchange')),
    exchangeController = require(path.resolve(__dirname, '..', './controllers/ExchangeController')),
    userController = require(path.resolve(__dirname, '..', './controllers/UserController')),

    Poloniex = require('poloniex-api-node'),
    binance = require('node-binance-api'),
    { Bitstamp } = require('node-bitstamp');

router.post('/add-new-exchange', (req, res) => {
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
            let newObj = {}
            for (let i = 0; i < exchangeInfoArr.length; i++) {
                let exchangeName = Object.keys(exchangeInfoArr[i])[0]
                newObj[ exchangeName ] = exchangeInfoArr[i][exchangeName]
            }
            return newObj
        })
        .catch(e => console.log("There was an error in queryExchangesForBalances", e))
}

router.get('/get-exchange-info', (req, res) => {
    exchangeController.getExchangeInfo({ "referenceMongoID" : req.session.id })
        .then( exchanges => {
            queryExchangesForBalances(exchanges)
                .then( exchangeInfo => {
                    res.json({ exchangeInfo })
                })
        })
})

module.exports = router

const exchangeGetters = {
    binance(exchange){
        return new Promise((resolve, reject) => {
            binance.options({
                'APIKEY': exchange.APIkey,
                'APISECRET': exchange.APIsecret,
                'recvWindow': 60000
            })

            binance.balance( balances => resolve({ binance: balances }) )
        })
    },

    bitstamp(exchange) {
        return new Promise((resolve, reject) => {
            const bitstamp = new Bitstamp({
                key: exchange.APIkey,
                secret: exchange.APIsecret,
                clientId: exchange.customerId,
                timeout: 5000,
                rateLimit: true //turned on by default
            })

            bitstamp.balance()
                .then(bitstampInfo => {

                    // TODO might need to add more metrics later
                    const newObj = {
                        BCH: { available: bitstampInfo.body.bch_balance },
                        BTC: { available: bitstampInfo.body.btc_balance },
                        ETH: { available: bitstampInfo.body.eth_balance },
                        LTC: { available: bitstampInfo.body.ltc_balance },
                        XRP: { available: bitstampInfo.body.xrp_balance }
                    }
                    resolve({ bitstamp: newObj })
                })
        })
    },

    poloniex(exchange) {
        return new Promise((resolve, reject) => {
            let poloniex = new Poloniex(exchange.APIkey, exchange.APIsecret)

            poloniex.returnBalances().then( balances => {
                const newObj = {}

                for (let key in balances) {
                    newObj[key] = { available: balances[key] }
                }

                resolve({ poloniex: newObj })
            }).catch((err) => {
                console.log(err.message)
            })
        })
    }
}
