const express = require('express'),
    router = express.Router(),
    path = require('path'),
    Exchange = require(path.resolve(__dirname, '..', './db/models/exchange')),
    exchangeController = require(path.resolve(__dirname, '..', './controllers/ExchangeController')),
    userController = require(path.resolve(__dirname, '..', './controllers/UserController')),

    Poloniex = require('poloniex-api-node'),
    binance = require('node-binance-api'),
    { Bitstamp } = require('node-bitstamp'),
    Kraken = require('kraken-api');

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

// function getPricing(wallets) {
//     return new Promise(function(resolve, reject) {
//         coinmarketcap.multi(coins => {
//             const copy = wallets.map(wallet => {
//                 wallet.priceUSD = coins.get(wallet.symbol).price_usd * wallet.balance
//                 return wallet
//             })
//             resolve(copy)
//         })
//     })
// }

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

function removeZeroBalance(balances) {
    const clone = Object.assign({}, balances)
    let sortable = []

    for (const key in clone) {
        clone[key].available == 0
            ? delete clone[key]
            : sortable.push( [key, parseFloat(clone[key].available) ]);

    }

    return clone
}

const exchangeGetters = {
    binance(exchange){
        return new Promise((resolve, reject) => {
            binance.options({
                'APIKEY': exchange.APIkey,
                'APISECRET': exchange.APIsecret,
                'recvWindow': 60000
            })

            binance.balance( balances => {
                newBalances = removeZeroBalance(balances)
                console.log("BINANCE: ", newBalances);
                // TODO Get Trade History: API has binance.trades("SNMBTC"), .allorder("SNMBTC")
                resolve({ binance: newBalances })
            })


        })
    },

    bitstamp(exchange) {
        return new Promise((resolve, reject) => {
            const bitstamp = new Bitstamp({
                key: exchange.APIkey,
                secret: exchange.APIsecret,
                clientId: exchange.customerId,
                timeout: 5000,
                rateLimit: true
            })

            bitstamp.balance().then(({ body: balances }) => {
                // console.log("BITSTAMP: ", balances);

                const newObj = {
                    BCH: { available: balances.bch_balance },
                    BTC: { available: balances.btc_balance },
                    ETH: { available: balances.eth_balance },
                    LTC: { available: balances.ltc_balance },
                    XRP: { available: balances.xrp_balance }
                }

                newBalances = removeZeroBalance(newObj)
                resolve({ bitstamp: newBalances })
            })
            .catch(err => console.log("There was an error in exchangeGetters.bitstamp: ", err.message))
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

                newBalances = removeZeroBalance(newObj)

                // returnOrderBook(currencyPair, depth [, callback])
                // returnTradeHistory(currencyPair, start, end, limit [, callback])


                resolve({ poloniex: newBalances })
            })
            .catch(err => console.log("There was an error in exchangeGetters.poloniex: ", err.message))
        })
    },

    kraken(exchange) {
        return new Promise((resolve, reject) => {
            const kraken = new Kraken(exchange.APIkey, exchange.APIsecret)

            kraken.api('Balance').then(({ result: balances }) => {
                const newObj = {}

                for (let key in balances) {
                    newObj[key] = { available: balances[key] }
                }

                newBalances = removeZeroBalance(newObj)
                resolve({ kraken: newBalances })
            })
            .catch(err => console.log("There was an error in exchangeGetters.kraken: ", err.message))
        })
    }
}
