import React, { useContext, useState, useCallback, memo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Building,
  Hash,
} from "lucide-react";
import axios from "axios";

// Memoized InputField component
const InputField = memo(({ 
  icon: Icon, 
  name, 
  type = "text", 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error,
  focused 
}) => (
  <div className="relative group">
    <label htmlFor={name} className="block text-sm font-medium text-black/90 mb-2">
      {label}
    </label>
    <div
      className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
      style={{ top: "28px" }}
    >
      <Icon
        className={`h-5 w-5 transition-colors duration-300 ${
          focused ? "text-yellow-600" : "text-gray-400"
        }`}
      />
    </div>
    <input
      type={type}
      name={name}
      id={name}
      defaultValue={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={label}
      className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:bg-white/20 focus:shadow-lg focus:shadow-purple-500/25 hover:bg-white/15 hover:border-gray-300 ${
        error ? "border-red-400 bg-red-50/20" : "border-gray-200"
      }`}
    />
    {error && (
      <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-medium animate-pulse">
        {error}
      </div>
    )}
  </div>
));

const PlaceOrder = () => {
  const { setCartItem, cartItem, getCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
    shippingMethod: "standard",
    saveInfo: false,
  });

  const [selectedOnlineOption, setSelectedOnlineOption] = useState("");
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");

  // Debounced form update
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    requestAnimationFrame(() => {
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    });
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "saveInfo") {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (validate()) {
      try {
        const products = Object.entries(cartItem).map(([productId, sizes]) => ({
          productId,
          quantity: Object.values(sizes).reduce((a, b) => a + b, 0),
        }));

        const totalAmount =
          getCartAmount() +
          (formData.shippingMethod === "express" ? 50 : 0) +
          Math.round(getCartAmount() * 0.18);

        const orderData = {
          userId: user?.id,
          products,
          totalAmount,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
          paymentMethod:
            formData.paymentMethod === "Online payment"
              ? selectedOnlineOption
              : formData.paymentMethod,
        };

        if (formData.paymentMethod === "Cash on Delivery") {
          const response = await axios.post(
            "https://naturehatch-website.onrender.com/api/order/create-order",
            orderData,
            {
              headers: { Authorization: Bearer `${token}` },
            }
          );

          if (response.data) {
            setCartItem({});
            localStorage.removeItem("cartItems");
            alert("Order placed successfully!");
            navigate("/orders");
          }
        } else if (formData.paymentMethod === "Online payment") {
          if (!selectedOnlineOption) {
            alert("Please select an online payment method");
            return;
          }
          alert(`Proceeding to ${selectedOnlineOption} payment...`);
          // Payment gateway integration here
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("There was an error processing your order");
      }
    }
  };

  // Rest of your JSX remains the same, but update the InputField usage
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:px-10 lg:px-20 xl:px-28">
      {/* ... existing header JSX ... */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="top-0 left-0 w-full bg-gradient-to-r from-green-500 to-green-700 rounded-t-3xl shadow-lg z-[-1] flex flex-col sm:justify-start items-center justify-center p-6 sm:p-8 mb-6">
              <h2 className="text-sm sm:text-3xl font-bold text-black mb-4">
                Shipping & Payment Details
              </h2>
              <p className="text-sm text-black/80 mb-6">
                Fill in your details to complete checkout
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6 sm:p-8">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-black flex items-center gap-2">
                    <User className="h-5 w-5" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      icon={User}
                      name="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      error={errors.name}
                      focused={focusedField === "name"}
                    />
                    <InputField
                      icon={Mail}
                      name="email"
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      error={errors.email}
                      focused={focusedField === "email"}
                    />
                  </div>
                  <InputField
                    icon={Phone}
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField("")}
                    error={errors.phone}
                    focused={focusedField === "phone"}
                  />
                </div>

                {/* Address Section */}
                <div className="space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-black flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> Delivery Address
                  </h3>
                  <InputField
                    icon={Home}
                    name="address"
                    label="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField("")}
                    error={errors.address}
                    focused={focusedField === "address"}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* City, State, Pincode fields */}
                    <InputField
                      icon={Building}
                      name="city"
                      label="City"
                      value={formData.city}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField("")}
                      error={errors.city}
                      focused={focusedField === "city"}
                    />
                    <InputField
                      icon={Building}
                      name="state"
                      label="State"
                      value={formData.state}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("state")}
                      onBlur={() => setFocusedField("")}
                      error={errors.state}
                      focused={focusedField === "state"}
                    />
                    <InputField
                      icon={Hash}
                      name="pincode"
                      label="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("pincode")}
                      onBlur={() => setFocusedField("")}
                      error={errors.pincode}
                      focused={focusedField === "pincode"}
                    />
                  </div>
                </div>

                {/* Payment Section */}
                {/* ... Your existing payment section JSX ... */}
                <div className="space-y-6">
                  {/* ... Payment method radio buttons ... */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Cash on Delivery", "Online payment"].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center p-4 sm:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.paymentMethod === method
                            ? "bg-white/25 border-2 border-yellow-600 shadow-lg"
                            : "bg-white/10 border-2 border-transparent hover:bg-white/15"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={(e) => {
                            handleChange(e);
                            setSelectedOnlineOption("");
                          }}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                            formData.paymentMethod === method
                              ? "border-purple-500 bg-yellow-500"
                              : "border-gray-400"
                          }`}
                        >
                          {formData.paymentMethod === method && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <span className="text-black font-semibold">
                            {method}
                          </span>
                          <p className="text-black/70 text-sm">
                            {method === "Cash on Delivery"
                              ? "Pay when you receive"
                              : "Secure online payment"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === "Online payment" && (
                    <div className="col-span-1 md:col-span-2 p-4 sm:p-6 bg-white/10 rounded-xl border border-dashed border-yellow-600 shadow-inner mt-2 space-y-4">
                      <h4 className="text-md font-semibold text-black">
                        Select Online Payment Option
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["PayPal", "Credit Card"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`w-full text-left px-4 py-3 rounded-xl bg-white/20 text-black font-medium shadow-md hover:bg-white/30 transition ${
                              selectedOnlineOption === option
                                ? "ring-2 ring-yellow-500"
                                : ""
                            }`}
                            onClick={() => setSelectedOnlineOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:from-yellow-700 hover:to-pink-700 text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-yellow-500/50 active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="h-5 w-5" /> Place Order
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden sticky top-4">
              <div className="bg-green-600 p-6 border-b border-white/20">
                <h3 className="text-xl font-bold text-black">Order Summary</h3>
              </div>
              <div className="p-6">
                <CartTotal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PlaceOrder);