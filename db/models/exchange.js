const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exchangeSchema = new Schema({
  name: { type: String },
  APIkey: { type: String },
  APIsecret: { type: String },
  customerId: { type: String },
  referenceMongoID: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const ModelClass = mongoose.model('Exchange', exchangeSchema)

module.exports = ModelClass
