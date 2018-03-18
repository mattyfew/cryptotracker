const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema({
    name: { type: String },
    address: { type: String },
    referenceMongoID: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const WalletClass = mongoose.model('Wallet', walletSchema)

module.exports = WalletClass
