const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const bookingRoute = require("./routes/bookingRoute");
const authRoute = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || true,
  }),
);

app.use("/api/tours", bookingRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Orchestrator Service is running",
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Orchestrator Service listening on port ${PORT}`);
});
