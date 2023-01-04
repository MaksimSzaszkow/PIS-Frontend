import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../config/routes";
import App from "../pages/App/App";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
  },
  {
    path: ROUTES.login,
    element: <App />,
  },
  {
    path: ROUTES.admin_panel,
    element: (
      <>
        <PrivateRoute>
          <AdminPanel />
        </PrivateRoute>
      </>
    ),
  },
]);
