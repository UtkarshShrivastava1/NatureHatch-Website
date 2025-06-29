import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLoginPage() {
    const navigate = useNavigate();
  return (
    <>
      <div className="h-[90vh] mt-[50vh]">
        <GoogleLogin
          onSuccess={ async (credentialResponse) => {
            // console.log(credentialResponse);
            const userData = jwtDecode(credentialResponse.credential);
            console.log(userData);

            try {
                const response = await axios.post("http://localhost:5000/api/user/login-google",{userData})
                // console.log(response.data);
                navigate("/")
                
            } catch (error) {
                console.log(error.message);
                alert("Failed to log in with Google");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
}

export default GoogleLoginPage;
