const express = require('express'),
  router = express.Router()

const path = require('path')
const exchangeController = require(path.resolve(__dirname, '..', './controllers/ExchangeController'))
const walletController = require(path.resolve(__dirname, '..', './controllers/WalletController'))
const userController = require(path.resolve(__dirname, '..', './controllers/UserController'))


const axios = require('axios')
const cc = require('cryptocompare')
// global.fetch = require('node-fetch')
const helpers = require('../utils/assetHelpers')
const { walletGetters, exchangeGetters } = helpers

router.get('/:type', (req, res) => {
  const { type } = req.params

  if (type === 'wallet') {
    walletController.getWalletInfo({ "referenceMongoID" : req.session.id })
    .then(wallets => {
        let promises = []

        wallets.forEach(wallet => {
            promises.push(walletGetters[wallet.name](wallet))
        })

        return Promise.all(promises)
        .then(walletInfo => {
            console.log(walletInfo);
            res.json({walletInfo})
        })
        .catch(err => {
            console.log("There was an error in getting wallet info.", err)
            res.send({
                confirmation: 'fail',
                message: err
            })
        })
    })
  }

  if (type === 'exchange') {
    // {poloniex: {BTC: { avalable: 400 } }, }

    exchangeController.getExchangeInfo({ "referenceMongoID" : req.session.id })
    .then(exchanges => {
        let promises = []
        exchanges.forEach(exchange => {
            promises.push(exchangeGetters[exchange.name](exchange))
        })

        return Promise.all(promises)
        .then(exchangeInfoArr => {
            const exchangeInfo = {}

            for (let i = 0; i < exchangeInfoArr.length; i++) {
                let exchangeName = Object.keys(exchangeInfoArr[i])[0]
                exchangeInfo[ exchangeName ] = exchangeInfoArr[i][exchangeName]
            }

            res.json({exchangeInfo})
        })
        .catch(err => {
            console.log("There was an error in getting exchange info.", err)
            res.json({
                confirmation: 'fail',
                message: err
            })
        })
    })
  }
})

router.post('/:type', (req, res) => {
    const { type } = req.params
    if (type === 'wallet') {
        walletController.post({
            referenceMongoID: req.session.id,
            name: req.body.cryptocurrency,
            address: req.body.address,
            alias: req.body.alias
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


    } else if (type === 'exchange') {
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
    }
})



router.get('/asset-information', (req, res) => {
  let coinListResult

  cc.coinList()
  .then((coinList) => {
    coinListResult = coinList
    return axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR')
  })
  .then((exRates) => {
    console.log('HELPERS: ', helpers)
    const assets = helpers.prepareAssetInformation(coinListResult, exRates)
    res.json({
      confirmation: 'success',
      result: assets
    })
  })
  .catch((err) => {
    console.log('ERROR in get asset-information: ', err)
    res.json({
      confirmation: 'fail',
      message: err
    })
  })
})


module.exports = router
