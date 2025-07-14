const express = require('express');
const router = express.Router();

const {createOrder,getAllOrders ,placeOrderByPaypal,allOrders} = require("../controllers/orderController")
const authMiddleware = require("../middlewares/userAuthMiddleware")
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

router.post('/create-order', authMiddleware, createOrder);
router.get('/get-all-orders', getAllOrders);
// router.get('/get-order/:id', authMiddleware, getOrderById);

// Place order by PayPal
router.post('/paypal', authMiddleware, placeOrderByPaypal);

// Get all orders (admin)
router.get('/all-orders', adminAuthMiddleware, allOrders);
//11:39:04  

module.exports = router;