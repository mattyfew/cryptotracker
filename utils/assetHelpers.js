const path = require('path')
const web3 = require('web3')
const config = require( path.resolve(__dirname, '..', './config'))

const { Bitstamp, CURRENCY } = require('node-bitstamp')
const etherscan = require('etherscan-api')
const cryptoBalance = require('crypto-balances')
const Poloniex = require('poloniex-api-node')
const binance = require('node-binance-api')
const Kraken = require('kraken-api')


function prepareAssetInformation(coinList, exRates) {
  const assetsWithExRate = exRates.data
  const list = coinList.Data
  let sortedAssetsAll = {}

  for (let key in list ) {
    let sortedAssets = {
      imageUrl: 'https://www.cryptocompare.com' + list[key].ImageUrl,
      name: key
    }
    sortedAssetsAll[key] = sortedAssets
  }

  assetsWithExRate.forEach((coin) => {
    const { symbol } = coin
    if (sortedAssetsAll[symbol] !== undefined) {
      coin['imageUrl'] = sortedAssetsAll[symbol].imageUrl
    } else {
      coin['imageUrl'] = 'not available'
    }
  })

  return assetsWithExRate
}



const exchangeGetters = {
  binance(exchange){
    return new Promise((resolve, reject) => {
      binance.options({
        'APIKEY': exchange.APIkey,
        'APISECRET': exchange.APIsecret,
        'recvWindow': 60000
      })

      binance.balance( balances => {

        // TODO Get Trade History: API has binance.trades("SNMBTC"), .allorder("SNMBTC")

        const newObj = {}
        for (let key in balances) {
          newObj[key] = { balance: balances[key].available }
        }
        newBalances = removeZeroBalance(newBalances)
        resolve({ binance: newBalances })
      })
    })
  },
  bitstamp(exchange) {
      console.log(exchange);
        return new Promise((resolve, reject) => {
          const bitstamp = new Bitstamp({
            key: exchange.APIkey,
            secret: exchange.APIsecret,
            clientId: exchange.customerId,
            timeout: 5000,
            rateLimit: true
          })

          bitstamp.balance()
          .then(({ body: balances }) => {
            const newObj = {
              BCH: { balance: balances.bch_balance },
              BTC: { balance: balances.btc_balance },
              ETH: { balance: balances.eth_balance },
              LTC: { balance: balances.ltc_balance },
              XRP: { balance: balances.xrp_balance }
            }

            newBalances = removeZeroBalance(newObj)
            resolve({ bitstamp: newBalances })
          }).catch(err => console.log("There was an error in exchangeGetters.bitstamp: ", err.message))
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
    clone[key].balance == 0
      ? delete clone[key]
      : sortable.push( [key, parseFloat(clone[key].balance) ])
  }

  return clone
}


module.exports = {
  walletGetters,
  exchangeGetters,
  prepareAssetInformation
}
