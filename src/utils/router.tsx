import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "../config/routes";
import App from "../pages/App/App";
import LandingPage from "../pages/LandingPage/LandingPage";

export const router = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <LandingPage />,
    },
    {
        path: ROUTES.login,
        element: <App />,
    },
    {
        path: ROUTES.myReservations,
        element: <LandingPage />
    },
    {
        path: ROUTES.allReservations,
        element: <LandingPage />
    },
    {
        path: ROUTES.adminPanel,
        element: <LandingPage />
    }
])