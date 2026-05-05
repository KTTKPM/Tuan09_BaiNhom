const express = require('express');
const cors = require('cors');
const db = require("./models");
const userController = require("./controllers/user.controller");
const errorFilter = require("./filters/error.filter");

const app = express();
app.use(cors());
app.use(express.json());

// Sync database
db.sequelize.sync();

// --- ROUTES ---
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/users/:id", userController.getById);
app.post("/logout", userController.logout);

// Error Middleware
app.use(errorFilter);

const PORT = 8081;
// Chạy trên IP LAN theo yêu cầu đề bài
app.listen(PORT, '0.0.0.0', () => {
    console.log(`User Service is running on port ${PORT}`);
});