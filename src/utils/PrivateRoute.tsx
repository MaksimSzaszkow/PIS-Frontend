import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;
