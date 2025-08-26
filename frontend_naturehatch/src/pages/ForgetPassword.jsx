import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ForgotImage from "../assets/frontend_assets/login_image.png"; // reuse any background image from assets

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl = "https://naturehatch-website.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      setMessage(res.data.message);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl shadow-2xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="hidden md:block w-1/2 bg-gray-200">
            <div className="relative w-full h-full min-h-64 overflow-hidden">
              <img
                src={ForgotImage}
                alt="Forgot Password"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-green-700/50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  Forgot Password?
                </h2>
                <p className="text-white mt-2 drop-shadow-md text-sm">
                  Enter your email to receive an OTP
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white p-6 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-center text-sm mb-6">
              We’ll send you an OTP to reset your password
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                Send OTP
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
            )}

            <div className="mt-6 text-center">
              <Link
                to="/reset-password"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Go to Reset Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
