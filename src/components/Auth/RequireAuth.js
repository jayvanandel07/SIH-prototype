import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/Auth/AuthContext";

const RequireAuth = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
