const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();

const PORT = process.env.PORT || 8080;
const uri = "mongodb://localhost:27017/icu";

app.use(express.static(path.join(__dirname, '..', 'icu-frontend-main', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'icu-frontend-main', 'dist', 'assets')));
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
app.get('/signup', (req, res) => {
  res.send('GET');
});



// 회원가입
app.post('/signup', async (req, res) => {
  try {
    const { id, password } = req.body;

    const existingUser = await User.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ success: false, message: '이미 가입된 계정입니다.' });
    }

    if (!password || password.length < 5) {
      return res.status(400).json({ success: false, message: '패스워드를 5자 이상 입력해주세요.' });
    }

    // 비밀번호를 해싱하여 저장
    const hashedPassword = await bcrypt.hash(password, 10);

    // 가입되지 않은 이메일이라면 새로운 사용자 생성
    const newUser = new User({ id, password: hashedPassword });

    await newUser.save();

    return res.status(200).json({ success: true, message: '회원가입 성공' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: '내부 서버 오류' });
  }
});

// 리액트 애플리케이션 서빙 및 서버 시작
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
