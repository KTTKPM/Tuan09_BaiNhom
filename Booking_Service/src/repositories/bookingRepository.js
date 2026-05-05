const pool = require("../config/dbConfig");

class BookingRepository {
  async save(booking) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO bookings (user_id, tour_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)",
        [booking.userId, booking.tourId, booking.quantity, booking.totalPrice, booking.status || "PENDING"],
      );
      return { id: Number(result.insertId), ...booking };
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = new BookingRepository();
