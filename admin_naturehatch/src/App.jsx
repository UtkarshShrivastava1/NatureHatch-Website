import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"; // Corrected typo
import Sidebar from "./components/sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Order";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl =
  import.meta.env.VITE_NODE_ENV === "production"
    ? `${import.meta.env.VITE_PRODUCTION_URL}/api`
    : `${import.meta.env.VITE_DEVELOPMENT_URL}/api`;
export const currency = "₹";

const ProtectedRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
      <Login token={token} setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%]  my-8 text-gray-600 text-base">
              <Routes>
                <Route
                  path="/add"
                  element={
                    <ProtectedRoute token={token}>
                      <Add token={token} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list"
                  element={
                    <ProtectedRoute token={token}>
                      <List token={token} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute token={token}>
                      <Orders token={token} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
