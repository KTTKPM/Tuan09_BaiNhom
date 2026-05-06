const bookingRepository = require("../repositories/bookingRepository");

class BookingService {
  async createBooking(bookingData) {
    const { userId, tourId, quantity, totalPrice } = bookingData;
    if (!userId || !tourId || !quantity) throw new Error("Thiếu thông tin đặt tour");
    const booking = { userId, tourId, quantity, totalPrice: totalPrice || 0, status: "PENDING" };
    return await bookingRepository.save(booking);
  }
}

module.exports = new BookingService();
