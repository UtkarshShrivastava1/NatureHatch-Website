import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  console.log(import.meta.env.VITE_PRODUCTION_URL);
  // console.log(import.meta.env);
  // const backendUrl = import.meta.env.VITE_PRODUCTION_URL;
  const backendUrl = "https://naturehatch-website.onrender.com"

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [orders , setOrders] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // ---------------------------
  // Cart Count Calculation
  // ---------------------------
  useEffect(() => {
    let count = 0;
    for (const itemId in cartItem) {
      if (typeof cartItem[itemId] === "number") {
        count += cartItem[itemId];
      } else {
        for (const size in cartItem[itemId]) {
          count += cartItem[itemId][size];
        }
      }
    }
    setCartCount(count);
  }, [cartItem]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken) {
      setToken(storedToken);
      // console.log("Stored token:", storedToken);
      fetchCartFromServer(); // <- Fetch cart if token is present
    }
  }, []);

  // ---------------------------
  // Add to Cart
  // ---------------------------
  const addToCart = async (itemId, quantity) => {
    let cartData = structuredClone(cartItem);
    quantity = Number(quantity);

    if (typeof cartData[itemId] === "number") {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = (cartData[itemId] || 0) + quantity;
    }

    setCartItem(cartData);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/api/user/add-to-cart`,
        { productId: itemId, quantity: String(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
      toast.error("Could not update cart on server");
    }
  };

  // ---------------------------
  // Fetch Cart From Server
  // ---------------------------
  const fetchCartFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}/api/user/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const backendCart = {};
      for (const item of response.data.cart) {
        const productId = item.productId._id || item.productId;
        const quantity = item.quantity;

        backendCart[productId] = quantity;
      }

      setCartItem(backendCart);
    } catch (error) {
      console.error("Failed to load cart from server", error.message);
    }
  };

  // ---------------------------
  // Update Quantity (Frontend + Backend)
  // ---------------------------
  const updateQuantity = async (productId, size, quantity) => {
    quantity = Number(quantity);
    const updatedCart = structuredClone(cartItem);

    if (quantity > 0) {
      updatedCart[productId] = quantity;
    } else {
      delete updatedCart[productId];
    }

    setCartItem(updatedCart);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/api/user/update-cart`,
        {
          productId,
          quantity: String(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Update cart failed:", err.response?.data || err.message);
      toast.error("Could not update cart on server");
    }
  };


  // ---------------------------
  // Remove Item from Cart
  // ---------------------------

  const removeFromCart = async (productId) => {
  const updatedCart = structuredClone(cartItem);
  delete updatedCart[productId];
  setCartItem(updatedCart);

  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${backendUrl}/api/user/clear-item`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Item removed from cart");
  } catch (err) {
    console.error("Remove item failed:", err.response?.data || err.message);
    toast.error("Could not remove item from server");
  }
};


  // ---------------------------
  // Get Cart Total
  // ---------------------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      if (typeof cartItem[itemId] === "number") {
        totalAmount += product.price * cartItem[itemId];
      } else {
        for (const size in cartItem[itemId]) {
          totalAmount += product.price * cartItem[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  // ---------------------------
  // Get Products
  // ---------------------------
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products/get-all-products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch products error:", error.message);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token,orders]);



  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}/api/order/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }
, [token]);


  // ---------------------------
  // Provided Context
  // ---------------------------
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    cartCount,
    addToCart,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    navigate,
    removeFromCart
    ,fetchCartFromServer,
    fetchOrders,
    orders,
    setCartItem
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
