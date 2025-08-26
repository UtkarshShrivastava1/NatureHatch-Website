const express = require('express');
const router = express.Router();
const {userSignUp,userLogin,userLoginWithGoogle,addToCart,updateCart,updateDeliveryInfo, userVerifyEmail,getCart,clearItem,myOrders} = require("../controllers/userController");
const authMiddleware = require("../middlewares/userAuthMiddleware");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");


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
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOtp = otp;
  user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // valid 10 minutes
  await user.save();

  // Send email (simplified)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP sent to email" });
});

router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({
    email,
    resetOtp: otp,
    resetOtpExpires: { $gt: Date.now() }, // not expired
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  user.password = newPassword; // hashed via pre-save hook
  user.resetOtp = undefined;
  user.resetOtpExpires = undefined;

  await user.save();

  res.json({ message: "Password has been reset successfully" });
});




module.exports = router;