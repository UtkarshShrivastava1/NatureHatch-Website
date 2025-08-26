import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const backendUrl = 'https://naturehatch-website.onrender.com';


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="cursor-pointer" type="submit">Send OTP</button>
      </form>
      <p>{message}</p>
      <Link to={"/reset-password"}>Reset Password</Link>
    </div>
  );
};

export default ForgotPassword;
