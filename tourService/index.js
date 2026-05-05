const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tours');

const app = express();
const PORT = 8082; // Đúng như đề bài yêu cầu

// ===== MIDDLEWARE =====
app.use(cors()); // Cho phép cross-origin request
app.use(express.json()); // Parse JSON body từ request

// ===== ROUTES =====
app.use('/tours', tourRoutes);

// ===== HEALTH CHECK (Orchestrator có thể dùng để kiểm tra service còn sống) =====
app.get('/health', (req, res) => {
    res.json({
        service: 'Tour Service',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// ===== KHỞI ĐỘNG SERVER =====
app.listen(PORT, () => {
    console.log(`✅ Tour Service đang chạy tại http://localhost:${PORT}`);
    console.log(`   GET http://localhost:${PORT}/tours`);
    console.log(`   GET http://localhost:${PORT}/tours/:id`);
});