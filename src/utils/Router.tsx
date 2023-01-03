import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "../config/routes";
import App from "../pages/App/App";
import LandingPage from "../pages/LandingPage/LandingPage";
import UserReservationsPage from "../pages/UserReservationsPage/UserReservationsPage";
import AllReservationsPage from "../pages/AllReservationsPage/AllReservationsPage";

export const router = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <LandingPage/>,
    },
    {
        path: ROUTES.login,
        element: <App/>,
    },
    {
        path: ROUTES.myReservations,
        element: <UserReservationsPage/>
    },
    {
        path: ROUTES.allReservations,
        element: <AllReservationsPage/>
    },
    {
        path: ROUTES.adminPanel,
        element: <LandingPage/>
    }
])