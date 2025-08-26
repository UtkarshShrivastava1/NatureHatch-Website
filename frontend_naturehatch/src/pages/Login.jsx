import { useState, useEffect } from "react";
import LoginImage from "../assets/frontend_assets/login_image.png";
import SignupImage from "../assets/frontend_assets/signup_image.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ token, setToken }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [token , setToken] = useState("");

  const backendUrl = "https://naturehatch-website.onrender.com";
  const navigate = useNavigate();

  //  const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (currentState === "Sign Up") {
  //       // 1. Check passwords match
  //       if (password !== confirmPassword) {
  //         toast.error("Passwords don't match!");
  //         return;
  //       }

  //       // 2. Make signup request
  //       const response = await axios.post(
  //         ${backendUrl}/api/user/sign-up,
  //         {
  //           name,
  //           email,
  //           phone,
  //           password,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       // 3. Inspect response and handle logic
  //       const data = response.data;
  //       console.log("Sign Up Response:", data);

  //       if (data.token) {
  //         setToken(data.token);
  //         localStorage.setItem("token", data.token);
  //         toast.success("Registration successful!");
  //         navigate("/");
  //       } else if (data.success || response.status === 201) {
  //         // If backend returns a success flag or HTTP 201, treat as success
  //         toast.success(data.message || "Registration successful!");
  //         navigate("/login"); // Or "/" if auto-login not supported
  //       } else {
  //         toast.error(data.message || "Registration failed");
  //       }
  //     } else {
  //       // Login flow
  //       const loginResponse = await axios.post(
  //         ${backendUrl}/api/user/login,
  //         { email, password },
  //         {
  //           withCredentials: true,
  //           headers: token ? { Authorization: Bearer ${token} } : {},
  //         }
  //       );

  //       const loginData = loginResponse.data;
  //       console.log("Login Response:", loginData);

  //       if (loginData.token) {
  //         const { user } = loginData;
  //         localStorage.setItem("token", loginData.token);
  //         localStorage.setItem("user", JSON.stringify({
  //           id: user?.id,
  //           email: user?.email
  //         }));
  //         setToken(loginData.token);
  //         toast.success("Login successful!");
  //         navigate("/");
  //       } else {
  //         toast.error(loginData.message || "Login failed");
  //       }
  //     }
  //   } catch (error) {
  //     // Always log the error
  //     console.error(error.response?.data?.message || error.message);

  //     // User-friendly error handling
  //     const message = error.response?.data?.message || error.message || "Authentication failed";
  //     toast.error(message);
  //   }
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //   if (!setToken) {
    //   console.error('setToken function is not available');
    //   toast.error('An error occurred during authentication');
    //   return;
    // }

    try {
      if (currentState === "Sign Up") {
        // 1. Validate passwords
        if (password !== confirmPassword) {
          toast.error("Passwords don't match!");
          return;
        }

        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }

        // 2. Make signup request
        const response = await axios.post(
          `${backendUrl}/api/user/sign-up`,
          {
            name,
            email,
            phone,
            password,
          },
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        console.log("Sign Up Response:", data);

        // 3. Handle signup success scenarios
        if (data.token) {
          // Case 1: Backend returns token - Auto login
          // setToken(data.token);
          localStorage.setItem("token", data.token);
          console.log(data);

          if (data.user) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: data.user.id,
                email: data.user.email,
              })
            );
          }

          toast.success("Registration successful!");
          navigate("/");
        } else if (data.success || response.status === 201) {
          // Case 2: Backend indicates success but requires manual login
          toast.success("Registration successful! Please log in.");
          setCurrentState("Login");
          setIsFlipped(false);
          // Clear signup form
          setPassword("");
          setConfirmPassword("");
        } else {
          // Case 3: Unexpected response format
          throw new Error("Invalid server response");
        }
      } else {
        // Login flow
        const loginResponse = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password },
          {
            withCredentials: true,
          }
        );

        const loginData = loginResponse.data;
        console.log("Login Response:", loginData);

        if (!loginData || !loginData.token) {
          throw new Error("Invalid login response");
        }

        // Store auth data
        // setToken(loginData.token);
        localStorage.setItem("token", loginData.token);

        if (loginData.user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: loginData.user.id,
              email: loginData.user.email,
            })
          );
        }

        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);

      // Detailed error handling
      let errorMessage = "Authentication failed";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post(${backendUrl}/api/user/login, {
  //       email,
  //       password,
  //     });
  //     if (response.data.token) {
  //       // setToken(response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //       toast.success("Login successful!");
  //       navigate("/");
  //     } else {
  //       toast.error(response.data.message || "Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error.message);
  //     toast.error("Failed to log in");
  //   }
  // };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const userData = jwtDecode(credentialResponse.credential);
      console.log("Google user data:", userData);

      const response = await axios.post(`${backendUrl}/api/user/login-google`, {
        userData,
      });

      if (response.data.token) {
        // setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Google login successful!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
      toast.error("Failed to log in with Google");
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setCurrentState(isFlipped ? "Login" : "Sign Up");
    // Reset form fields when flipping
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setConfirmPassword("");
  };

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
        <div
          className="relative"
          style={{
            perspective: "1000px",
            minHeight: "850px", // Increased height for laptop view
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
              <div className="hidden sm:block w-full md:w-1/2 bg-gray-200">
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
                    {/* Sign Up Button on Image Section */}
                    <button
                      onClick={flipCard}
                      className="mt-6 px-6 py-2 bg-white text-green-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Form Section */}
              <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8">
                <div className="text-center mb-4 md:mb-8">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    Sign in to your account
                  </p>
                </div>

                {/* Sign Up Button for Mobile View */}
                <div className="sm:hidden mb-4 text-center">
                  <button
                    onClick={flipCard}
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
                          type="email"
                          id="login-email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          type={showConfirmPassword ? "text" : "password"}
                          id="login-password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("login-password")}
                          onBlur={handleBlur}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
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
                        href="/forget-password"
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
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center w-full  h-10">
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
                  </div>
                </form>

                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-xs md:text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={flipCard}
                      className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Side 2 - Sign Up */}
          <div
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              isFlipped ? "opacity-100 z-10" : "opacity-0 -z-10"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Signup Form Section */}
              <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-8">
                <div className="text-center mb-4 md:mb-6">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Create an Account
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base">
                    Join Nature Hatch today
                  </p>
                </div>

                <form
                  onSubmit={onSubmitHandler}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "signup-name"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type="text"
                          id="signup-name"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("signup-name")}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "signup-email"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type="email"
                          id="signup-email"
                          placeholder="Email Address"
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("signup-email")}
                          onBlur={handleBlur}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "signup-phone"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type="tel"
                          id="signup-phone"
                          placeholder="Phone Number"
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("signup-phone")}
                          onBlur={handleBlur}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "signup-password"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type="password"
                          id="signup-password"
                          placeholder="Password"
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("signup-password")}
                          onBlur={handleBlur}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        className={`w-full transition-transform duration-200 ${
                          focusedInput === "signup-confirm"
                            ? "scale-102"
                            : "scale-100"
                        }`}
                      >
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="signup-confirm"
                          placeholder="Confirm Password"
                          className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          onFocus={() => handleFocus("signup-confirm")}
                          onBlur={handleBlur}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agree-terms"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <label
                      htmlFor="agree-terms"
                      className="ml-2 block text-xs md:text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-500"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-500"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 md:py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 text-sm md:text-base cursor-pointer"
                  >
                    Sign Up
                  </button>

                  {/* Google Sign Up Button */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center w-full">
                    <GoogleLogin
                      onSuccess={() => {
                        handleGoogleLogin;
                        console.log("Google Login Success");
                        navigate("/");
                      }}
                      onError={() => {
                        console.log("Google Login Failed");
                        toast.error("Google login failed");
                      }}
                      shape="rectangular"
                      width="100%"
                      text="signup_with"
                      theme="outline"
                      size="large"
                      useOneTap
                      logo_alignment="center"
                    />
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs md:text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={flipCard}
                      className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
                    >
                      Log In
                    </button>
                  </p>
                </div>
              </div>

              {/* Image Section - Hidden on smallest screens */}
              <div className="hidden sm:block w-full md:w-1/2 bg-gray-200">
                <div className="relative w-full h-full min-h-64 overflow-hidden rounded-lg">
                  <img
                    src={SignupImage}
                    alt="Organic farm with free-range chickens"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 to-green-800/60"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                      Join Our Community
                    </h2>
                    <p className="text-white mt-2 drop-shadow-md text-sm md:text-base">
                      For the freshest organic eggs delivered to your door
                    </p>
                    {/* Login Button on Image Section */}
                    <button
                      onClick={flipCard}
                      className="mt-6 px-6 py-2 bg-white text-green-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
