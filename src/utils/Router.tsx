import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "../config/routes";
import App from "../pages/App/App";
import AddReservationPage from "../pages/AddReservationPage/AddReservationPage";
import UserReservationsPage from "../pages/UserReservationsPage/UserReservationsPage";
import AllReservationsPage from "../pages/AllReservationsPage/AllReservationsPage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";

export const router = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <AddReservationPage/>,
    },
    {
        path: ROUTES.login,
        element: <App/>,
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
    }
]);
