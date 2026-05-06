const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bookingController = require("./controllers/bookingController");
const globalErrorHandler = require("./exceptions/globalExceptionHandler");
require("dotenv").config();

const app = express();

const DEFAULT_CORS_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
  "http://localhost:8083",
  "http://localhost:8084",
  "http://orchestrator:8080",
  "http://user-service:8081",
  "http://tour-service:8082",
  "http://booking-service:8083",
  "http://payment-service:8084",
  "http://frontend:3000",
].join(",");

const allowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS || DEFAULT_CORS_ALLOWED_ORIGINS
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/bookings", bookingController);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8083;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`-----------------------------------------`);
  console.log(`BOOKING SERVICE đang chạy tại cổng: ${PORT}`);
  console.log(`-----------------------------------------`);
});
