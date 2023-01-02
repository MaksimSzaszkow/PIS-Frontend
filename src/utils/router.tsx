import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "../config/routes";
import App from "../pages/App/App";

export const router = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <App />,
    },
    {
        path: ROUTES.login,
        element: <App />,
    }
])