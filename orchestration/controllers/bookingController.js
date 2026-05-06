const axios = require("axios");
const BookingResult = require("../models/BookingResult");

const userServiceUrl = process.env.USER_SERVICE_URL;
const tourServiceUrl = process.env.TOUR_SERVICE_URL;
const bookingServiceUrl = process.env.BOOKING_SERVICE_URL;
const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;

const getTours = async (req, res) => {
  try {
    if (!tourServiceUrl) {
      return res.status(500).json({
        success: false,
        message: "Thiếu cấu hình URL tour service trong biến môi trường",
      });
    }

    const response = await axios.get(`${tourServiceUrl}/tours`);
    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const detail = error.response?.data || error.message;
    return res.status(status).json({
      success: false,
      message: "Không thể lấy danh sách tour",
      error: detail,
    });
  }
};

const getTourById = async (req, res) => {
  const { id } = req.params;

  if (!tourServiceUrl) {
    return res.status(500).json({
      success: false,
      message: "Thiếu cấu hình URL tour service trong biến môi trường",
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID tour là bắt buộc",
    });
  }

  try {
    const response = await axios.get(`${tourServiceUrl}/tours/${id}`);
    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const detail = error.response?.data || error.message;
    return res.status(status).json({
      success: false,
      message: "Không thể lấy thông tin tour",
      error: detail,
    });
  }
};

const bookTour = async (req, res) => {
  const { userId, tourId, quantity, totalPrice } = req.body;

  if (!userId || !tourId || !quantity || !totalPrice) {
    return res.status(400).json({
      success: false,
      message: "userId, tourId, quantity và totalPrice là bắt buộc",
    });
  }

  if (
    !userServiceUrl ||
    !tourServiceUrl ||
    !bookingServiceUrl ||
    !paymentServiceUrl
  ) {
    return res.status(500).json({
      success: false,
      message: "Thiếu cấu hình URL service trong biến môi trường",
    });
  }

  try {
    const userResponse = await axios.get(`${userServiceUrl}/users/${userId}`);
    const user = userResponse.data.data;

    const tourResponse = await axios.get(`${tourServiceUrl}/tours/${tourId}`);
    const tour = tourResponse.data.data;

    const bookingResponse = await axios.post(`${bookingServiceUrl}/bookings`, {
      userId,
      tourId,
      quantity,
      totalPrice,
    });
    const booking = bookingResponse.data.data;
    const bookingId = booking.bookingId || booking.id || booking.code || null;

    console.log({
      booking,
      bookingId,
      totalPrice,
    });

    const paymentResponse = await axios.post(`${paymentServiceUrl}/payments`, {
      bookingId,
      amount: totalPrice,
    });
    const payment = paymentResponse.data.data;

    const result = new BookingResult({
      user,
      tour,
      bookingId,
      paymentStatus: payment.status || "SUCCESS",
    });

    return res.status(200).json({
      success: true,
      message: "Đặt tour thành công",
      data: result,
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const detail = error.response?.data || error.message;

    return res.status(status).json({
      success: false,
      message: "Workflow đặt tour thất bại",
      error: detail,
    });
  }
};

module.exports = {
  bookTour,
  getTours,
  getTourById,
};
