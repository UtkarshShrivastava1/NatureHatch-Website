import React, { useState, useContext } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import { currency } from "../../../admin_naturehatch/src/App";

const PlaceOrder = () => {
  // const navigate = useNavigate();
  const { cartItem, getCartAmount, navigate, userId } = useContext(ShopContext);

  // Form state
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form validation
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      tempErrors.phone = "Phone number must be 10 digits";
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.pincode) tempErrors.pincode = "Pin code is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      tempErrors.pincode = "Pin code must be 6 digits";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validate()) {
  //     // Prepare delivery information
  //     const deliveryInfo = {
  //       country: "India",
  //       firstName: formData.name.split(" ")[0] || formData.name,
  //       lastName: formData.name.split(" ").slice(1).join(" ") || "",
  //       address: formData.address,
  //       city: formData.city,
  //       state: formData.state,
  //       pinCode: formData.pincode,
  //       phone: formData.phone,
  //       saveInfoForNextTime: formData.saveInfo
  //     };

  //     try {
  //       // Prepare products array in the format expected by backend
  //       const products = [];
  //       Object.entries(cartItem).forEach(([itemId, sizes]) => {
  //         Object.entries(sizes).forEach(([size, quantity]) => {
  //           products.push({
  //             productId: itemId,
  //             quantity: quantity
  //           });
  //         });
  //       });

  //       // Create order data
  //       const orderData = {
  //         userId,
  //         products,
  //         totalAmount: getCartAmount() + (formData.shippingMethod === "express" ? 50 : 0) + Math.round(getCartAmount() * 0.18),
  //         shippingAddress: formData.address,
  //         paymentMethod: formData.paymentMethod,
  //       };

  //       const token = localStorage.getItem('token');

  //       const createOrderRes = await fetch('http://localhost:5000/api/order/create-order', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         },
  //         body: JSON.stringify(orderData)
  //       });

  //       if (!createOrderRes.ok) {
  //         throw new Error('Failed to create order');
  //       }

  //       alert("Order placed successfully!");
  //       navigate("/orders");
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert("There was an error processing your order. Please try again.");
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (validate()) {
      try {
        const orderData = {
          products: Object.entries(cartItem).map(([productId, sizes]) => ({
            productId,
            quantity: Object.values(sizes).reduce((a, b) => a + b, 0),
          })),
          totalAmount: getCartAmount(),
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
          paymentMethod: formData.paymentMethod,
        };

        const response = await fetch(
          "http://localhost:5000/api/order/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          }
        );

        if (!response.ok) {
          throw new Error("Order creation failed");
        }

        const data = await response.json();
        // Handle successful order
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error processing your order");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"CHECKOUT"} text2={"DETAILS"} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Customer information form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <div className="text-lg font-medium mb-4">
                Personal Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-8">
              <div className="text-lg font-medium mb-4">
                Delivery Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs">{errors.address}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="state"
                    className="text-sm font-medium text-gray-700"
                  >
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs">{errors.state}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="pincode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pin Code*
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter your pin code"
                    className={`border rounded px-3 py-2 text-sm ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <div className="text-lg font-medium mb-4">Shipping Method</div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 border rounded p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === "standard"}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="font-medium">Standard Delivery</div>
                    <div className="text-sm text-gray-500">
                      Delivery within 1-2 days
                    </div>
                  </div>
                  <div className="ml-auto font-medium">Free</div>
                </label>

                <label className="flex items-center gap-2 border rounded p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === "express"}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="font-medium">Express Delivery</div>
                    <div className="text-sm text-gray-500">
                      Delivery within 24 hours
                    </div>
                  </div>
                  <div className="ml-auto font-medium">₹50</div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <div className="text-lg font-medium mb-4">Payment Method</div>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 border rounded p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={formData.paymentMethod === "cashOnDelivery"}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">
                      Pay when you receive your order
                    </div>
                  </div>
                </label>

                <label className="flex items-center gap-2 border rounded p-3 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="onlinePayment"
                    checked={formData.paymentMethod === "onlinePayment"}
                    onChange={handleChange}
                    className="accent-orange-500"
                  />
                  <div>
                    <div className="font-medium">Online Payment</div>
                    <div className="text-sm text-gray-500">
                      Pay using UPI, Credit/Debit Card, Net Banking
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Save Information */}
            <div className="mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                <span className="text-sm">
                  Save this information for next time
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-medium py-3 rounded-md mt-6 hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right column - Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 border rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>

            <div className="max-h-60 overflow-y-auto mb-4">
              {Object.keys(cartItem).length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty</p>
              ) : (
                Object.keys(cartItem).map((itemId) => (
                  <OrderSummaryItem
                    key={itemId}
                    itemId={itemId}
                    sizes={cartItem[itemId]}
                  />
                ))
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{getCartAmount()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {formData.shippingMethod === "express" ? "₹50" : "Free"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">
                  ₹{Math.round(getCartAmount() * 0.18)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-medium text-lg">Total</span>
                <span className="font-bold text-lg">
                  ₹
                  {getCartAmount() +
                    (formData.shippingMethod === "express" ? 50 : 0) +
                    Math.round(getCartAmount() * 0.18)}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-4">
              <p>
                By placing this order, you agree to our{" "}
                <a href="#" className="text-blue-500">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for order summary items
const OrderSummaryItem = ({ itemId, sizes }) => {
  const { products } = useContext(ShopContext);
  const productInfo = products.find((p) => p._id === itemId);

  if (!productInfo) return null;

  return (
    <div className="flex items-center gap-3 mb-3 pb-3 border-b">
      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
        <img
          src={productInfo.imageURL}
          alt={productInfo.productname}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="font-medium">{productInfo.productname}</div>
        <div className="font-medium">
          {currency}
          {productInfo.price}
        </div>
        <div className="font-medium">{productInfo.averageRating}</div>
        {Object.keys(sizes).map((size) => (
          <div
            key={size}
            className="text-sm text-gray-600 flex justify-between"
          >
            <span>
              {size} × {sizes[size]}
            </span>
            <span className="font-medium">
              ₹{(productInfo.price * sizes[size]).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceOrder;
