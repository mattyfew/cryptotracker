const UserController = require('./UserController')
const ExchangeController = require('./ExchangeController')
const WalletController = require('./WalletController')

module.exports = {
  user: UserController,
  exchange: ExchangeController,
  wallet: WalletController
}
