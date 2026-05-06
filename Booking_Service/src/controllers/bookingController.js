const express = require("express");
const router = express.Router();
const bookingService = require("../services/bookingService");

router.post("/", async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, message: "Đặt tour thành công", data: booking });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
