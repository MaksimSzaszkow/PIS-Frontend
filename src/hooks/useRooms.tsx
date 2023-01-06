import {useState} from "react";
import {Datetime} from "../types/Reservation.types";
import {Rooms} from "../types/Rooms.types";

export function useRooms() {
    const [rooms, setRooms] = useState<Rooms[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getAllRooms = async () => {
        const response = await fetch("http://localhost:8080/rooms/all-rooms", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setRooms(data);
            setErrorMessage(null);
        } else {
            setRooms([]);
            setErrorMessage("Error fetching rooms");
        }
    };

    const getUserRooms = async () => {
        const response = await fetch("http://localhost:8080/rooms/my-rooms", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setRooms(data);
            setErrorMessage(null);
        } else {
            setRooms([]);
            setErrorMessage("Error fetching rooms");
        }
    };

    const checkAvailableRooms = async (datetime: Datetime) => {
        const response = await fetch(
            "http://localhost:8080/rooms/get-available-rooms",
            {
                method: "POST",
                body: JSON.stringify(datetime),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
                }
            })
        if (response.ok) {
            const data = await response.json();
            setRooms(data);
            setErrorMessage(null);
        } else {
            setErrorMessage(await response.text());
            setRooms([]);
        }
    }

    return {
        getAllRooms: getAllRooms,
        getUserRooms: getUserRooms,
        checkAvailableRooms: checkAvailableRooms,
        rooms: rooms,
        roomsErrorMessage: errorMessage
    };
}
