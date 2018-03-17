const express = require('express'),
    router = express.Router(),
    path = require('path'),
    web3 = require('web3'),
    chalk = require('chalk'),

    Wallet = require(path.resolve(__dirname, '..', './db/models/wallet')),
    walletController = require(path.resolve(__dirname, '..', './controllers/WalletController')),
    config = require( path.resolve(__dirname, '..', './config') ),

    etherscan = require('etherscan-api'),
    cryptoBalance = require('crypto-balances');

    // blockcypher = require('blockcypher');

router.post('/add-new-wallet', (req, res) => {
    walletController.post({
        referenceMongoID: req.session.id,
        name: req.body.cryptocurrency,
        address: req.body.address
    })
    .then(newWallet => {
        console.log("New wallet added to DB", newWallet)

        walletController.getById(req.session.id)
        .then(user => {
            user.wallets.push(newWallet._id)
            user.save()

            res.json({ success: true, newWallet })
        })
    })
    .catch(e => console.log("There was an error in /add-new-wallet", e))

})

router.get('/get-wallet-info', (req, res) => {
    walletController.getWalletInfo({ "referenceMongoID" : req.session.id })
    .then( wallets => {
        queryWalletsForBalances(wallets)
        .then( walletInfo => {
            res.json({ walletInfo })
        })
    })
    .catch(e => console.log("There was an error in /get-wallet-info", e))
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
    bitcoin({ address }) {
        return new Promise(function(resolve, reject) {
            cryptoBalance(address, (err, results) =>{
                if (err) reject(err)
                console.log("this should be bitcoin", results);
                resolve({
                    cryptocurrency: 'bitcoin',
                    symbol: 'BTC',
                    address,
                    balance: results[0].quantity
                })
            })
        })
    },

    ethereum({ address }) {
        return new Promise((resolve, reject) => {
            const key = config.etherscanApiKey
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

    litecoin({ address }) {
        return new Promise(function(resolve, reject) {
            cryptoBalance(address, (err, results) =>{
                if (err) reject(err)
                console.log("this should be litecoin", results);
                resolve({
                    cryptocurrency: 'litecoin',
                    symbol: 'LTC',
                    address,
                    balance: results[0] && results[0].quantity
                })
            })
        })
    }
}
