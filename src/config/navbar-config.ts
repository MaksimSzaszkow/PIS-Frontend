import {ROUTES} from "./routes";

type navItem = {
    text: string,
    route: string,
    onClick?: () => void,
    isForAdmin: boolean,
}
export const NAVBAR_CONFIG: navItem[] = [
    {
        route: ROUTES.home,
        text: "Home",
        isForAdmin: false,
    },
    {
        route: ROUTES.myReservations,
        text: "My Reservations",
        isForAdmin: true,
    },
    {
        route: ROUTES.allReservations,
        text: "All Reservations",
        isForAdmin: false,
    },
    {
        route: ROUTES.addReservation,
        text: "Add Reservation",
        isForAdmin: true
    },
    {
        route: ROUTES.adminPanel,
        text: "Admin Panel",
        isForAdmin: true
    }
]