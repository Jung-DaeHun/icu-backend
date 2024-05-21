const Store = require('../models/Store');

// 매장 등록 컨트롤러
exports.createStore = async (req, res) => {
    try {
        const { name, location, wifi, owner } = req.body;
        const newStore = new Store({ name, location, wifi, user: owner });
        await newStore.save();
        
        res.status(201).json(newStore);
    } catch (error) {
        console.error('매장 등록 중 오류 발생:', error);
        res.status(500).json({ error: '매장 등록 중 오류가 발생했습니다.', errorMessage: error.message });
    }
};

// 매장 리스트 조회 컨트롤러
exports.getStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        console.error('매장 리스트를 불러오는 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류: 매장 리스트를 불러올 수 없습니다.' });
    }
};