const express = require('express'),
  router = express.Router()
const path = require('path')
const web3 = require('web3')
const config = require( path.resolve(__dirname, '..', './config'))


const exchangeController = require(path.resolve(__dirname, '..', './controllers/ExchangeController'))
const walletController = require(path.resolve(__dirname, '..', './controllers/WalletController'))

const { Bitstamp, CURRENCY } = require('node-bitstamp')
const etherscan = require('etherscan-api')
const cryptoBalance = require('crypto-balances')
const Poloniex = require('poloniex-api-node')
const binance = require('node-binance-api')
const Kraken = require('kraken-api')

router.post('/:type', (req, res) => {
  const { type } = req.params

  if (type === 'wallet') {
    // wallets = [{ referenceMongoID: xx, name: 'ethereum', address: 'dfmjnsfXX'}]
    const { wallets } = req.body

    walletController.getWalletInfo({ "referenceMongoID" : req.session.id })
    .then(wallets => {
        let promises = []

        wallets.forEach(wallet => {
            console.log(wallet);
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
    // const { exchanges } = req.body

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

router.get('/exchange-rate', (req, res) => {
 //TODO
})


router.get('/asset-images', (req, res) => {
  //TODO ; also check public folder
})

const exchangeGetters = {
  binance(exchange){
    return new Promise((resolve, reject) => {
      binance.options({
        'APIKEY': exchange.APIkey,
        'APISECRET': exchange.APIsecret,
        'recvWindow': 60000
      })

      binance.balance( balances => {
        newBalances = removeZeroBalance(balances)
        // TODO Get Trade History: API has binance.trades("SNMBTC"), .allorder("SNMBTC")

        const newObj = {}

        for (let key in newBalances) {
          newObj[key] = { balance: newBalances[key].available }
        }

        resolve({ binance: newObj })
      })
    })
  },
  bitstamp(exchange) {
        return new Promise((resolve, reject) => {
            const bitstamp = new Bitstamp({
                key: exchange.APIkey,
                secret: exchange.APIsecret,
                clientId: exchange.customerId,
                timeout: 5000,
                rateLimit: true
            })

            bitstamp.balance().then(({ body: balances }) => {
                const newObj = {
                    BCH: { balance: balances.bch_balance },
                    BTC: { balance: balances.btc_balance },
                    ETH: { balance: balances.eth_balance },
                    LTC: { balance: balances.ltc_balance },
                    XRP: { balance: balances.xrp_balance }
                }

                newBalances = removeZeroBalance(newObj)
                resolve({ bitstamp: newBalances })
            })
            .catch(err => console.log("There was an error in exchangeGetters.bitstamp: ", err.message))
        })
    },

    poloniex(exchange) {
        return new Promise((resolve, reject) => {
            let poloniex = new Poloniex(exchange.APIkey, exchange.APIsecret)

            poloniex.returnBalances().then( balances => {
                const newObj = {}

                for (let key in balances) {
                    newObj[key] = { balance: balances[key] }
                }

                newBalances = removeZeroBalance(newObj)

                // returnOrderBook(currencyPair, depth [, callback])
                // returnTradeHistory(currencyPair, start, end, limit [, callback])


                resolve({ poloniex: newBalances })
            })
            .catch(err => console.log("There was an error in exchangeGetters.poloniex: ", err.message))
        })
    },

    kraken(exchange) {
        return new Promise((resolve, reject) => {
            const kraken = new Kraken(exchange.APIkey, exchange.APIsecret)

            kraken.api('Balance').then(({ result: balances }) => {
                const newObj = {}

                for (let key in balances) {
                    newObj[key] = { balance: balances[key] }
                }

                newBalances = removeZeroBalance(newObj)
                resolve({ kraken: newBalances })
            })
            .catch(err => console.log("There was an error in exchangeGetters.kraken: ", err.message))
        })
    }
}












const walletGetters = {
    bitcoin({address}) {
        return new Promise(function(resolve, reject) {
            cryptoBalance(address, (err, results) =>{
                if (err) reject(err)
                resolve({
                    cryptocurrency: 'bitcoin',
                    symbol: 'BTC',
                    address,
                    balance: results[0].quantity
                })
            })
        })
    },

    ethereum({address}) {
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

    litecoin({address}) {
        return new Promise(function(resolve, reject) {
            cryptoBalance(address, (err, results) =>{
                if (err) reject(err)
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


function removeZeroBalance(balances) {
    const clone = Object.assign({}, balances)
    let sortable = []

    for (const key in clone) {
        clone[key].available == 0
            ? delete clone[key]
            : sortable.push( [key, parseFloat(clone[key].available) ])

    }

    return clone
}

module.exports = router
