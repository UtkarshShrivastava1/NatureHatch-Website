const express = require('express');
const router = express.Router();

const {createOrder,getAllOrders} = require("../controllers/orderController")
const authMiddleware = require("../middlewares/userAuthMiddleware")

router.post('/create-order', authMiddleware, createOrder);
router.get('/get-all-orders', getAllOrders);

module.exports = router;