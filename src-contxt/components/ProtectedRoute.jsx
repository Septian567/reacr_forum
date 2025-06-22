import React from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api"; // Pastikan path-nya sesuai

const ProtectedRoute = ({ children }) => {
  const token = api.getAccessToken();
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
