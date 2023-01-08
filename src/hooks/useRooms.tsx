import {useContext, useState} from "react";
import {Datetime} from "../types/Reservation.types";
import {RoomEditFormData, Rooms} from "../types/Rooms.types";
import {ApiContext} from "../contexts/ApiContext";

export function useRooms() {
    const {setSuccessMessage, setErrorMessage, setLoading} = useContext(ApiContext);
    const [rooms, setRooms] = useState<Rooms[]>([]);

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
        setLoading(true);
        setSuccessMessage(null);
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
        setLoading(false);
    }

    const deleteRoom = async (room: Rooms) => {
        const response = await fetch("http://localhost:8080/rooms/delete-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
            body: room.id,
        });
        if (response.ok) {
            await getAllRooms();
        }
    };

    const handleEditRoom = async (room: Rooms, editData: RoomEditFormData) => {
        const response = await fetch("http://localhost:8080/rooms/edit-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
            body: JSON.stringify({
                roomId: room.id,
                ...editData,
            }),
        });
        if (response.ok) {
            await getAllRooms();
        }
    };

    return {
        getAllRooms: getAllRooms,
        getUserRooms: getUserRooms,
        deleteRoom: deleteRoom,
        handleEditRoom: handleEditRoom,
        checkAvailableRooms: checkAvailableRooms,
        rooms: rooms,
    };
}
