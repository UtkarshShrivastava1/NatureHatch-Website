const express = require('express');
const router = express.Router();
const {userSignUp,userLogin,userLoginWithGoogle,addToCart,updateCart,updateDeliveryInfo, userVerifyEmail,getCart,clearItem,myOrders,forgotPassword,resetPassword} = require("../controllers/userController");
const authMiddleware = require("../middlewares/userAuthMiddleware");


router.post('/sign-up',userSignUp);
router.get('/verify-email',userVerifyEmail);
router.post('/login', userLogin);
router.post('/login-google', userLoginWithGoogle);
router.post('/add-to-cart', authMiddleware ,addToCart);
router.get('/cart', authMiddleware, getCart);
router.post('/update-cart', authMiddleware ,updateCart);
router.post("/clear-item", authMiddleware , clearItem);
router.post('/update-delivery-info', authMiddleware ,updateDeliveryInfo);
router.get('/my-orders' , myOrders);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);



module.exports = router;