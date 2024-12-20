// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

const existingBooking = await Booking.findOne({
    room,
    $or: [
        { checkInDate: { $lte: checkOutDate, $gte: checkInDate } },
        { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } },
    ],
});

if (existingBooking) {
    return res.status(400).json({ error: 'Room is already booked for the selected dates' });
}


// Tạo một booking mới
router.post('/', isAuthenticated, async (Request, res) => {
    const { room, checkInDate, checkOutDate, totalPrice } = req.body;

    try {
        const newBooking = new Booking({
            user: req.user.id,
            room,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy danh sách booking của người dùng hiện tại
router.get('/my-bookings', isAuthenticated, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('room');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy danh sách booking (admin)
router.get('/', isAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room user');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
