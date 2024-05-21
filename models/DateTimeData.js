// models/DateTimeData.js
const mongoose = require('mongoose');

const dateTimeDataSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: 'Wi-Fi',
    required: true
  },
  capturedAt: {
    type: Date,
    required: true
  },
  log: {
    type: String,
  }
});

const DateTimeData = mongoose.model('DateTimeData', dateTimeDataSchema);

module.exports = DateTimeData;