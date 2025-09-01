import React, { useState, useEffect } from 'react';
import { Search, Package, User, Calendar, MapPin, CreditCard, IndianRupee, Filter, X } from 'lucide-react';

const Order = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const backendUrl = "https://naturehatch-website.onrender.com";

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/order/get-all-orders`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setList(data);
      setFilteredList(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${backendUrl}/api/order/update-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      alert(`Order status updated to ${newStatus}`);
      fetchList();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  // Search and filter function
  const handleSearch = (searchValue, statusValue) => {
    let filtered = list;

    // Filter by status
    if (statusValue !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase() === statusValue.toLowerCase()
      );
    }

    // Filter by search term
    if (searchValue.trim() !== '') {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(order => {
        // Search in order ID
        const orderIdMatch = order._id.toLowerCase().includes(searchLower);
        
        // Search in user name and email
        const userNameMatch = order.userId?.name?.toLowerCase().includes(searchLower) || false;
        const userEmailMatch = order.userId?.email?.toLowerCase().includes(searchLower) || false;
        
        // Search in shipping address
        const addressMatch = order.shippingAddress?.toLowerCase().includes(searchLower) || false;
        
        // Search in payment method
        const paymentMatch = order.paymentMethod?.toLowerCase().includes(searchLower) || false;
        
        // Search in product names
        const productMatch = order.products.some(product => 
          product.productId?.productname?.toLowerCase().includes(searchLower) || false
        );
        
        // Search in total amount
        const amountMatch = order.totalAmount.toString().includes(searchLower);
        
        // Search in date
        const dateMatch = new Date(order.orderDate).toLocaleString().toLowerCase().includes(searchLower);

        return orderIdMatch || userNameMatch || userEmailMatch || addressMatch || 
               paymentMatch || productMatch || amountMatch || dateMatch;
      });
    }

    setFilteredList(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value, statusFilter);
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    handleSearch(searchTerm, value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setFilteredList(list);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Get unique statuses for filter dropdown
  const uniqueStatuses = [...new Set(list.map(order => order.status))];

  return (
    <div className="w-full ml-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Orders Management</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, users, products, address..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white min-w-[140px] transition-colors"
                >
                  <option value="all">All Status</option>
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Results Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Showing {filteredList.length} of {list.length} orders
              </span>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={clearSearch}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || statusFilter !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>Search: "{searchTerm}"</span>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      handleSearch('', statusFilter);
                    }}
                    className="ml-2 hover:bg-green-200 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {statusFilter !== 'all' && (
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <span>Status: {statusFilter}</span>
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      handleSearch(searchTerm, 'all');
                    }}
                    className="ml-2 hover:bg-blue-200 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

         {/* Search Statistics */}
      {list.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{list.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {list.filter(order => order.status === 'Pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {list.filter(order => order.status === 'Shipped').length}
              </div>
              <div className="text-sm text-gray-600">Shipped</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {list.filter(order => order.status === 'Delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
          </div>
        </div>
      )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading orders...</span>
          </div>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No matching orders found' : 'No orders found'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search criteria or filters.' 
              : 'Orders will appear here once customers start placing them.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={clearSearch}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        
        <div className="bg-white rounded-lg shadow-md border border-green-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-green-600 text-white text-sm">
                <tr>
                  <th className="px-4 py-3 font-semibold">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Order ID
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      User
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Address
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    <div className="flex items-center">
                      <IndianRupee className="w-4 h-4 mr-2" />
                      Amount
                    </div>
                  </th>
                  <th className="px-4 py-3 font-semibold">Products</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50 divide-y divide-green-100">
                {filteredList.map((order, index) => (
                  <tr key={order._id} className="hover:bg-green-75 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {order._id.slice(-8)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {order.userId?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">
                        {order.userId?.email || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600 text-xs max-w-xs truncate block">
                        {order.shippingAddress || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600 text-xs">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-green-200 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-200 text-blue-800'
                            : order.status === 'Pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : order.status === 'Cancelled'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600 text-sm">
                        {order.paymentMethod || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        {order.products && order.products.length > 0 ? (
                          <ul className="text-xs space-y-1">
                            {order.products.slice(0, 2).map((product, idx) => (
                              <li key={idx} className="text-gray-600">
                                <span className="font-medium">
                                  {product.productId?.productname || 'Unknown Product'}
                                </span>
                                <span className="text-gray-500">
                                  {' '}(₹{product.productId?.price || 0}) × {product.quantity}
                                </span>
                              </li>
                            ))}
                            {order.products.length > 2 && (
                              <li className="text-gray-500 text-xs">
                                +{order.products.length - 2} more items
                              </li>
                            )}
                          </ul>
                        ) : (
                          <span className="text-gray-500 text-xs">No products</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white min-w-[120px] transition-colors"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Order;