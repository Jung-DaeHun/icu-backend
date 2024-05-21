const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(409).json({ success: false, message: '존재하지 않는 사용자입니다. 회원가입을 진행해주세요.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
    }

    res.status(200).json({ success: true, message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ success: false, message: '로그인 중 에러가 발생했습니다.' });
  }
};