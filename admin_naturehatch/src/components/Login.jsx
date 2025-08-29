import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const backendUrl = "https://naturehatch-website.onrender.com"

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  // saving email and passwords to local storage
  const onSubmitHandler = async (e) => {
    try {
      //use for stop unwanted refresshing
      e.preventDefault();
      if (!username || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/admin/login`,
        { username, password }
      );
   
      toast.success("Login Succesful");
      setToken(response.data.token);
      navigate("/add");
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
        <div
          className="relative"
          style={{
            perspective: "1000px",
            minHeight: "550px", // Increased height for laptop view
            height: "auto",
          }}
        >
          {/* Card Side 1 - Login */}
          <div
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              isFlipped ? "opacity-0 -z-10" : "opacity-100 z-10"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section - Hidden on smallest screens */}
              {/* <div className="hidden sm:block w-full md:w-1/2 bg-gray-200">
                <div className="relative w-full h-full min-h-64 overflow-hidden rounded-lg">
                  <img
                    src={LoginImage}
                    alt="Fresh farm eggs in a basket surrounded by green nature"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-green-700/50"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                      Nature Hatch
                    </h2>
                    <p className="text-white mt-2 drop-shadow-md text-sm md:text-base">
                      Farm fresh eggs from happy hens
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Login Form Section */}
              <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8">
                <div className="text-center mb-4 md:mb-8">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Admin Login
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    Manage your inverntory with Ease
                  </p>
                </div>

                {/* Sign Up Button for Mobile View */}
                <div className="sm:hidden mb-4 text-center">
                  <button
                    // onClick={flipCard}
                    className="w-full py-2 px-4 rounded-lg border-2 border-green-500 text-green-600 font-medium hover:bg-green-50 transition duration-300"
                  >
                    Create New Account
                  </button>
                </div>

                <form
                  onSubmit={onSubmitHandler}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "login-email"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type="text"
                          id="login-email"
                          placeholder="Admin username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("login-email")}
                          onBlur={handleBlur}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "login-password"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type="password"
                          id="login-password"
                          placeholder="Admin password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("login-password")}
                          onBlur={handleBlur}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 md:py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer text-sm md:text-base"
                  >
                    Log In
                  </button>

                  {/* Google Login Button */}
                  {/* <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                   */}
                  {/* <div className="flex justify-center w-full  h-10">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => {
                        console.log("Google Login Failed");
                        toast.error("Google login failed");
                      }}
                      shape="rectangular"
                      width="100%"
                      text="continue_with"
                      theme="outline"
                      size="large"
                      useOneTap
                      logo_alignment="center"
                    />
                  </div> */}
                </form>

                {/* <div className="mt-4 md:mt-6 text-center">
                  <p className="text-xs md:text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      // onClick={flipCard}
                      className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
