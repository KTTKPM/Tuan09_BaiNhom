const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const paymentController = require("./controllers/paymentController");
const globalErrorHandler = require("./exceptions/globalExceptionHandler");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/payments", paymentController);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8084;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`-----------------------------------------`);
  console.log(`PAYMENT SERVICE đang chạy tại cổng: ${PORT}`);
  console.log(`-----------------------------------------`);
});
