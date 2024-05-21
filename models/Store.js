// models/Store.js
const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
  },
  wifi: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User 스키마와의 연결
    required: false
  },
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;