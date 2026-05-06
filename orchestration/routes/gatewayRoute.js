const express = require("express");
const {
  login,
  getUserById,
  getTours,
  getTourById,
} = require("../controllers/gatewayController");

const router = express.Router();

router.post("/login", login);
router.get("/users/:id", getUserById);
router.get("/tours", getTours);
router.get("/tours/:id", getTourById);

module.exports = router;
