const express = require("express");
const { bookTour } = require("../controllers/bookingController");

const router = express.Router();

router.post("/book-tour", bookTour);

module.exports = router;
