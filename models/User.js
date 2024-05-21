// models/User.js
const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    trim: true,
    unique: 1, 
  },
  password: {
    type: String,
    minlength: 5,
  },
  phoneNumber: {
    type: String,

  },
  role: {
    // 매장 등록 여부
    type: Number,
    default: 0, // 0은 매장등록 없이 회원가입
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;