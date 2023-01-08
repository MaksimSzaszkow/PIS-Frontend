import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "../config/routes";
import LandingPage from "../pages/LandingPage/LandingPage";
import UserReservationsPage from "../pages/UserReservationsPage/UserReservationsPage";
import AllReservationsPage from "../pages/AllReservationsPage/AllReservationsPage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Home from "../pages/Home/Home";
import AddReservationPage from "../pages/AddReservationPage/AddReservationPage";

export const router = createBrowserRouter([
    {path: ROUTES.home, element: <LandingPage/>},
    {path: "*", element: <Navigate to={ROUTES.home}/>},
]);

export const authorizedRouter = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <Home/>,
    },
    {
        path: ROUTES.myReservations,
        element: <UserReservationsPage/>,
    },
    {
        path: ROUTES.allReservations,
        element: <AllReservationsPage/>,
    },
    {
        path: ROUTES.adminPanel,
        element: <AdminPanel/>,
    },
    {
        path: ROUTES.addReservation,
        element: <AddReservationPage/>,
    },
    {
        path: "*",
        element: <Navigate to={ROUTES.home}/>,
    },
]);
