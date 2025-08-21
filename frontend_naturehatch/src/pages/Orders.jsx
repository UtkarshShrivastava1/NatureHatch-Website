import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUser = localStorage.getItem("user"); // stored userId
  // console.log(userId)

  // if (storedUser) {
  const user = JSON.parse(storedUser);
  console.log("User ID:", user.id);    // 👉 "68a597970b6ed4bc430a5a22"
  console.log("User Email:", user.email);
// } 
const userId = user.id // convert string → object
console.log(userId)
  // Fetch orders
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       setLoading(true);

  //       if (!userId) {
  //         setError("User not logged in");
  //         setLoading(false);
  //         return;
  //       }

  //       const response = await fetch(
  //         "https://naturehatch-website.onrender.com/api/user/my-orders",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ userId }),
  //         }
  //       );

  //       if (!response.ok) throw new Error("Failed to fetch orders");

  //       const data = await response.json();
  //       setOrders(data.orders || []);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [userId]);


  useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);

      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://naturehatch-website.onrender.com/api/user/my-orders?userId=${userId}`
      );

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [userId]);

  if (loading) {
    return (
      <div className="border-t pt-16 mb-52 px-4 sm:px-8">
        <div className="text-2xl mb-6">
          <Title text1={"YOUR"} text2={"ORDERS"} />
        </div>
        <p className="text-gray-600 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-16 mb-52 px-4 sm:px-8">
        <div className="text-2xl mb-6">
          <Title text1={"YOUR"} text2={"ORDERS"} />
        </div>
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 mb-52 px-4 sm:px-8">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-600 text-lg">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id || index}
              className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300 space-y-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Order #{order._id.slice(-8).toUpperCase()}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>

              {/* Products */}
              {order.products.map((prod, i) => {
                const product = prod.productId; // populated product
                return (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t pt-4"
                  >
                    <div className="flex gap-4 items-start">
                      <img
                        src={product?.imageURL || "/placeholder.png"}
                        alt={product?.productname || "Product"}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {product?.productname || "Product Name"}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-sm">
                          <p>
                            {currency}
                            {product?.price || "0"}
                          </p>
                          <p>Qty: {prod.quantity}</p>
                        </div>
                      </div>
                    </div>

                    <button className="text-sm sm:text-base border px-4 py-1.5 rounded-md bg-white hover:bg-gray-100 text-gray-700 transition">
                      Track Order
                    </button>
                  </div>
                );
              })}

              {/* Order Summary */}
              <div className="pt-4 border-t text-sm text-gray-700 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
                <p className="flex-1">
                  <span className="font-semibold">Shipping Address:</span>{" "}
                  {order.shippingAddress}
                </p>

                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border w-fit mx-auto sm:mx-0
      ${
        order.status === "Delivered"
          ? "bg-green-50 border-green-500 text-green-700"
          : order.status === "Pending"
          ? "bg-yellow-50 border-yellow-500 text-yellow-700"
          : "bg-gray-100 border-gray-400 text-gray-700"
      }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <p className="rounded-full">{order.status}</p>
                </div>

                <p className="flex-1 sm:text-right">
                  <span className="font-semibold">Total:</span> {currency}
                  {order.totalAmount}
                </p>
              </div>

              {/* Payment Method */}
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Payment Method:</span>{" "}
                {order.paymentMethod}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
