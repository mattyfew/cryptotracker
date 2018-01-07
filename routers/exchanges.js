const express = require('express'),
    router = express.Router(),
    path = require('path'),
    binance = require('node-binance-api'),
    Exchange = require(path.resolve(__dirname, '..', './db/models/exchange'));

router.post('/add-new-exchange', (req, res) => {
    console.log("about to add new exchange", req.body);

    let exchange = new Exchange({
        type: req.body.exchange,
        key: req.body.key,
        secret: req.body.secret,
        customerId: req.body.customerId || null
    })

    exchange.save(( err, newExchange ) => {
        if (err) console.error(err)

        console.log("New exchange added to DB", newExchange)

        res.json({
            success: true,
            newExchange
        })
    })
})

router.get('/get-exchange-info', (req, res) => {
    // CODE DEBT: need to change this to read from the logged in userId
    Exchange.findOne({ _id: '5a510180803346867f41a836' }, (err, exchangeInfo) => {
        if (err) console.log(err)

        // console.log("Results from /get-exchange-info mongo query: ", exchangeInfo)


        // CODE DEBT: Need to organize how to query each API. Should it be client-side?
        getBinanceInfo(exchangeInfo.key, exchangeInfo.secret)
            .then( binanceBalances => {
                console.log(binanceBalances);
                res.json({
                    success: true,
                    exchangeInfo: {
                        binance: binanceBalances
                    }
                })
            })
    })
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


router.get('/get-binance-info', (req, res) => {
    console.log("GET /get-binance-info")


})

module.exports = router
