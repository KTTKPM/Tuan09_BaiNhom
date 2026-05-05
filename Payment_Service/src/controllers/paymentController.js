const express = require("express");
const router = express.Router();
const paymentService = require("../services/paymentService");

router.post("/", async (req, res, next) => {
  try {
    const result = await paymentService.processPayment(req.body);
    res.status(200).json({ success: true, message: "Thanh toán thành công", data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
