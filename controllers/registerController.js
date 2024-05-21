const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
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
    
    res.status(201).json({ success: true, message: '회원가입 성공' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: '내부 서버 오류' });
  }
};