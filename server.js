const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const storeRoutes = require('./routes/storeRoutes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const PORT = process.env.PORT || 8080;
const uri = "mongodb+srv://letsicu:NfAFuzoVLMfVZOdU@icu.1jprfk4.mongodb.net/icu?retryWrites=true&w=majority&appName=icu";

app.use(express.json());
app.use(cors());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


// 회원가입
app.use('/register', registerRouter);
// 로그인
app.use('/', loginRouter);
//매장 등록 및 리스트
app.use('/api/store', storeRoutes);

app.listen(PORT, () => {  console.log(`Server is listening on port ${PORT}`);
});