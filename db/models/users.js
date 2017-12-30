const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    username: { type: String, unique: true, lowercase: true },
    firstname: { type: String, unique: false },
    lastname: { type: String, unique: false },
    imageUrl: { type: String, unique: false },
    password: { type: String }
}, { timestamps: true });

const ModelClass = mongoose.model('User', userSchema);

module.exports = ModelClass;
