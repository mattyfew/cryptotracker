const express = require('express'),
    router = express.Router(),
    path = require('path'),

    Wallet = require(path.resolve(__dirname, '..', './db/models/wallet')),
    walletController = require(path.resolve(__dirname, '..', './controllers/WalletController')),

    bitcoin = require('bitcoin');

router.post('/add-new-wallet', (req, res) => {
    walletController.post({
        referenceMongoID: req.session.id,
        name: req.body.cryptocurrency,
        address: req.body.address
    })
    .then(newWallet => {
        console.log("New wallet added to DB", newWallet)

        userController.getById(req.session.id)
        .then(user => {
            user.wallets.push(newWallet._id)
            user.save()

            res.json({ success: true, newWallet })
        })
    })
})

router.get('/get-wallet-info', (req, res) => {})

module.exports = router
