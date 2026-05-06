const axios = require("axios");

const userServiceUrl = process.env.USER_SERVICE_URL;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "username và password là bắt buộc",
    });
  }

  try {
    const response = await axios.post(`${userServiceUrl}/login`, {
      username,
      password,
    });
    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const detail = error.response?.data || error.message;
    return res.status(status).json({
      success: false,
      message: "Đăng nhập thất bại",
      error: detail,
    });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "username và password là bắt buộc",
    });
  }

  try {
    const response = await axios.post(`${userServiceUrl}/register`, {
      username,
      password,
    });
    return res.status(201).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const detail = error.response?.data || error.message;
    return res.status(status).json({
      success: false,
      message: "Đăng ký thất bại",
      error: detail,
    });
  }
};

module.exports = {
  login,
  register,
};
