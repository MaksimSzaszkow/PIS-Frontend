import {useState} from "react";

export function useReservations() {
    const [reservations, setReservations] = useState<any>([]);

    const getAllReservations = async () => {
        const response = await fetch("http://localhost:8080/reservation/all-reservations", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setReservations(data);
        } else {
            setReservations(null);
        }
    }

    const getUserReservations = async () => {
        const response = await fetch("http://localhost:8080/reservation/my-reservations", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setReservations(data);
        } else {
            setReservations(null);
        }
    }

    return {
        getAllReservations: getAllReservations,
        getUserReservations: getUserReservations,
        reservations: reservations,

    }
}