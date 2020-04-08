const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Reservation} = require("../models/reservation");

router.get('/', async (req, res) => {
    const reservations = await Reservation.find({ date: { $gte: Date.now() } }).select("date table")
	res.status(200).json({
		status: 200,
		data: reservations
	});
});

router.get('/all', auth, async (req, res) => {
    const reservations = await Reservation.find();
	res.status(200).json({
		status: 200,
		data: reservations
	});
});

module.exports = router;