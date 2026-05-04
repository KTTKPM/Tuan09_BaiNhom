const axios = require("axios");
const BookingResult = require("../models/BookingResult");

const bookTour = async (req, res) => {
  const { userId, tourId } = req.body;

  if (!userId || !tourId) {
    return res.status(400).json({
      success: false,
      message: "userId và tourId là bắt buộc",
    });
  }

  const userServiceUrl = process.env.USER_SERVICE_URL;
  const tourServiceUrl = process.env.TOUR_SERVICE_URL;
  const bookingServiceUrl = process.env.BOOKING_SERVICE_URL;
  const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;

  if (!userServiceUrl || !tourServiceUrl || !bookingServiceUrl || !paymentServiceUrl) {
    return res.status(500).json({
      success: false,
      message: "Thiếu cấu hình URL service trong biến môi trường",
    });
  }

  try {
    const userResponse = await axios.get(`${userServiceUrl}/users/${userId}`);
    const user = userResponse.data;

    const tourResponse = await axios.get(`${tourServiceUrl}/tours/${tourId}`);
    const tour = tourResponse.data;

    const bookingResponse = await axios.post(`${bookingServiceUrl}/bookings`, {
      userId,
      tourId,
    });
    const booking = bookingResponse.data;
    const bookingId = booking.bookingId || booking.id || booking.code || null;

    const paymentResponse = await axios.post(`${paymentServiceUrl}/payments`, {
      userId,
      bookingId,
      amount: tour.price || 0,
    });
    const payment = paymentResponse.data;

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
};
