import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router, authorizedRouter } from "../../utils/Router";
import PisSpinner from "../../components/PisSpinner/PisSpinner";

function App() {
  const { user, loading, token } = useContext(AuthContext);

  if (loading || (token.length === 0 && user.authorized)) return <PisSpinner />;

  if (!user.authorized) return <RouterProvider router={router} />;

  return <RouterProvider router={authorizedRouter} />;
}

export default App;
