const express = require('express'),
    router = express.Router(),
    path = require('path'),

    Wallet = require(path.resolve(__dirname, '..', './db/models/wallet')),
    walletController = require(path.resolve(__dirname, '..', './controllers/WalletController')),

    bitcoin = require('bitcoin-promise');

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

router.get('/get-wallet-info', (req, res) => {
    console.log("running GET /get-wallet-info");
    walletController.getWalletInfo({ "referenceMongoID" : req.session.id })
        .then( walletInfo => {
            // TODO: need to run the bitcoin GET wallet info stuff here
            const client = new bitcoin.Client({
                // host: 'localhost',
                // port: 3000,
                // timeout: 30000

                host: 'localhost',
                port: 8332,
                user: 'user',
                pass: 'pass'
            });
            
            client.getBalance(walletInfo[0].address, 6, function(err, balance, resHeaders) {
                if(err)return console.log(err)
                console.log('Balance:', balance)
            })
            // client.getNewAddress()
            //     .then(function(addr) {
            //         return client.validateAddress(addr);
            //     }).then(function(walletInfo) {
            //         console.log(walletInfo);
            //         res.json({ walletInfo })
            //     }).catch(function(err) {
            //         console.log(err);
            //     });


        })
})

module.exports = router
