const express = require('express'),
  router = express.Router()

const path = require('path')
const exchangeController = require(path.resolve(__dirname, '..', './controllers/ExchangeController'))
const walletController = require(path.resolve(__dirname, '..', './controllers/WalletController'))

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
