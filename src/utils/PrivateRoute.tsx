import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? children : <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;
