const express = require('express'),
    router = express.Router(),
    path = require('path'),
    web3 = require('web3'),
    chalk = require('chalk'),

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
    walletController.getWalletInfo({ "referenceMongoID" : req.session.id })
    .then( wallets => {
        queryWalletsForBalances(wallets)
        .then( walletInfo => {
            res.json({ walletInfo })
        })
    })
})

module.exports = router


function queryWalletsForBalances(wallets) {
    let promises = []
    wallets.forEach(wallet => {
        promises.push(walletGetters[wallet.name](wallet))
    })
    return Promise.all(promises)
    .then(walletInfoArr => {
        return walletInfoArr
    })
    .catch(e => console.log("There was an error in queryExchangesForBalances", e))
}

const walletGetters = {
    ethereum({ address }) {
        return new Promise((resolve, reject) => {
            const key = require( path.resolve(__dirname, '..', './config') ).etherscanApiKey
            const api = etherscan.init( key )

            api.account.balance(address)
            .then(balanceData => {
                resolve({
                    cryptocurrency: 'etherum',
                    symbol: 'ETH',
                    address,
                    balance: web3.utils.fromWei(balanceData.result)
                })
            })
            .catch(e => console.log("There was an error in get Ethereum", e))
        })
    },

    bitcoin({ address }) {
        return new Promise(function(resolve, reject) {
            // TODO: this
            resolve({
                cryptocurrency: 'bitcoin',
                symbol: 'BTC',
                address,
                balance: '9999999'
            })
        })
    }
}
