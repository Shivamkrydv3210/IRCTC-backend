const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { verifyApiKey } = require('../middlewares/adminMiddleware');

router.post('/', verifyApiKey, trainController.addTrain);

router.get('/', trainController.getTrains);

module.exports = router;
