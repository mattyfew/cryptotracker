const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeScema = new Schema({
    type: { type: String },
    key: { type: String },
    secret: { type: String },
    customerId: { type: String }
    // author: {
    //     id: { type: Schema.Types.ObjectId, ref: 'User' },
    //     username: { type: String }
    // }
}, { timestamps: true });

const ModelClass = mongoose.model('Exchange', exchangeScema);

module.exports = ModelClass;
