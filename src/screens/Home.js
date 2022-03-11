import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthContext";

const Home = () => {
  
  return (
    <div>
      <p>Home</p>
    </div>
  );
};

export default Home;
