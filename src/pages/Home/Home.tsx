import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import MainLayout from "../../layouts/MainLayout/MainLayout";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return <MainLayout></MainLayout>;
}
