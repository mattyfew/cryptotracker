const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userID: { type: String, unique: true }, // public address
  email: { type: String, unique: true, lowercase: true },
  displayName: { type: String, unique: true, lowercase: false },
  exchanges: [{
    type: Schema.Types.ObjectId,
    ref: 'Exchange'
  }]
}, { timestamps: true })

const ModelClass = mongoose.model('User', userSchema)

module.exports = ModelClass
