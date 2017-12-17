const express = require('express'),
    router = express.Router(),
    path = require('path'),
    ExchangeModel = require(path.resolve(__dirname, '..', './db/models/exchange'));



router.post('/add-new-exchange', (req, res) => {
    let exchange = new ExchangeModel({
        type: 'bitstamp',
        key: req.body.key,
        secret: req.body.secret,
        customerId: req.body.customerId
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


module.exports = router
