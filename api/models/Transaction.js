const mongoose = require('mongoose');
const {model, Schema} = require("mongoose")

const transactionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    datetime: {type: Date, required: true},
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
