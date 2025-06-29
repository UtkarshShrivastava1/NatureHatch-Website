import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Order = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/order/get-all-orders`);
      if (response.data) {
        setList(response.data);
        toast.success('Orders fetched successfully');
      } else {
        toast.error('No orders found');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId) => {
    try {
      const response = await axios.put(`${backendUrl}/api/order/update-status/${orderId}`, {
        status: 'Delivered',
      });
      if (response.data) {
        toast.success('Order marked as Delivered');
        fetchList();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full ml-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className=" bg-white rounded-lg shadow border border-green-100">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-600 text-white text-sm">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-50 divide-y divide-green-100">
              {list.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.userId?.name}</td>
                  <td className="px-4 py-2">{order.userId?.email}</td>
                  <td className="px-4 py-2">{order.shippingAddress}</td>
                  <td className="px-4 py-2">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.paymentMethod}</td>
                  <td className="px-4 py-2">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc pl-5">
                      {order.products.map((product) => (
                        <li key={product._id}>
                          ID: {product.productId} (Qty: {product.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">
                    {order.status !== 'Delivered' && (
                      <button
                        onClick={() => updateStatus(order._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
