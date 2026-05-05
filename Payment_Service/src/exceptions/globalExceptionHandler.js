module.exports = (err, req, res, next) => {
  console.error("LOG LỖI:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Lỗi hệ thống nội bộ",
    timestamp: new Date().toISOString(),
  });
};
