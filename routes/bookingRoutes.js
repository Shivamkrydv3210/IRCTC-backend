const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, bookingController.bookSeat);

router.get('/:bookingId', verifyToken, bookingController.getBookingDetails);

module.exports = router;
