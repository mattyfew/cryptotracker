const express = require('express'),
    router = express.Router(),
    path = require('path'),
    web3 = require('web3'),

    Wallet = require(path.resolve(__dirname, '..', './db/models/wallet')),
    walletController = require(path.resolve(__dirname, '..', './controllers/WalletController')),

    etherscan = require('etherscan-api');

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
        console.log("walletInfo: ", walletInfo);

        queryWalletsForBalances(walletInfo)
        .then( exchangeInfo => {
            res.json({ exchangeInfo })
        })
    })
})

module.exports = router


function queryWalletsForBalances(wallets) {
    let promises = []
    wallets.forEach(wallet => {
        console.log("the wallet----", wallet);
        promises.push(walletGetters[wallet.name](wallet))
    })
    return Promise.all(promises)
        .then(walletInfoArr => {
            let newObj = {}
            for (let i = 0; i < walletInfoArr.length; i++) {
                let walletName = Object.keys(walletInfoArr[i])[0]
                newObj[ walletName ] = walletInfoArr[i][walletName]
            }
            return newObj
        })
        .catch(e => console.log("There was an error in queryExchangesForBalances", e))
}

const walletGetters = {
    ethereum(addr) {
        return new Promise((resolve, reject) => {
            let key = require( path.resolve(__dirname, '..', './config') ).etherscanApiKey

            console.log("asdjfaj", addr);

            const api = etherscan.init( key )
            api.account.balance(addr.address)
            // api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae')

                .then(balanceData => {
                    console.log("we got some data!!", web3.utils.fromWei(balanceData.result));
                    resolve(balanceData)
                })
                .catch(e => console.log("There was an error in get Ethereum", e))

        })
    },

    bitcoin(addr) {
        return new Promise(function(resolve, reject) {
            // TODO: this
            return null
        })
    }
}
