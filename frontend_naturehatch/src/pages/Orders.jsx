import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { orders, currency, products } = useContext(ShopContext);

  const getProductDetails = (productId) => {
    return products.find((p) => p._id === productId);
  };

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
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600"></div>
              </div>

              {order.products.map((prod, i) => {
                const product = getProductDetails(prod.productId);
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
                          <p>Qty: {product.quantity}</p>
                        </div>
                        <p>Date: {new Date(order.orderDate).toDateString()}</p>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
