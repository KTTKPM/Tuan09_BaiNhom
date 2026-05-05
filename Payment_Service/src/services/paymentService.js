class PaymentService {
  async processPayment(paymentData) {
    const { bookingId, amount } = paymentData;
    if (!bookingId || !amount) throw new Error("Thiếu thông tin thanh toán");
    const isSuccess = Math.random() > 0.2;
    if (!isSuccess) throw new Error("Thanh toán thất bại");
    return { transactionId: `TXN-${Date.now()}`, bookingId, amount, status: "SUCCESS" };
  }
}

module.exports = new PaymentService();
