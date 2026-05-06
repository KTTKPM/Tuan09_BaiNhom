const axios = require("axios");

const login = async (req, res) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/login`, req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Service Unavailable" });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/users/${req.params.id}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Service Unavailable" });
  }
};

const getTours = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.TOUR_SERVICE_URL}/tours`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Service Unavailable" });
  }
};

const getTourById = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.TOUR_SERVICE_URL}/tours/${req.params.id}`);
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Service Unavailable" });
  }
};

module.exports = {
  login,
  getUserById,
  getTours,
  getTourById,
};
