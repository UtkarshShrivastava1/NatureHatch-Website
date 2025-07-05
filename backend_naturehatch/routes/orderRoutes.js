const express = require('express');
const router = express.Router();

const {createOrder,getAllOrders ,placeOrderByPaypal} = require("../controllers/orderController")
const authMiddleware = require("../middlewares/userAuthMiddleware")

router.post('/create-order', authMiddleware, createOrder);
router.get('/get-all-orders', getAllOrders);
// router.get('/get-order/:id', authMiddleware, getOrderById);
router.post('/paypal', authMiddleware, placeOrderByPaypal);

module.exports = router;