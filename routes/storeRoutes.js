const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// 매장 등록 엔드포인트
router.post('/', storeController.createStore);

// 매장 리스트 조회 엔드포인트
router.get('/', storeController.getStores);

module.exports = router;