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
    Exchange.findOne({ _id: '5a510180803346867f41a836' }, (err, exchangeInfo) => {
        if (err) console.log(err)

        console.log("the exchange info i got back is: ", exchangeInfo)

        res.json({
            success: true,
            exchangeInfo
        })

    })
})

module.exports = router
