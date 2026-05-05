const express = require('express');
const router = express.Router();
const tours = require('../data/tours.json');

// GET /tours — Lấy toàn bộ danh sách tour
router.get('/', (req, res) => {
    console.log('[Tour Service] GET /tours called');

    res.json({
        success: true,
        count: tours.length,
        data: tours
    });
});

// GET /tours/:id — Lấy chi tiết 1 tour theo ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id); // URL param luôn là string → ép kiểu số
    console.log(`[Tour Service] GET /tours/${id} called`);

    const tour = tours.find(t => t.id === id);

    if (!tour) {
        return res.status(404).json({
            success: false,
            message: `Không tìm thấy tour với id = ${id}`
        });
    }

    res.json({
        success: true,
        data: tour
    });
});

module.exports = router;