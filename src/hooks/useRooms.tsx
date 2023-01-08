import { useState } from "react";
import { RoomEditFormData, Rooms } from "../types/Rooms.types";

export function useRooms() {
  const [rooms, setRooms] = useState<any>([]);

  const getAllRooms = async () => {
    const response = await fetch("http://localhost:8080/rooms/all-rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setRooms(data);
    } else {
      setRooms(null);
    }
  };

  const getUserRooms = async () => {
    const response = await fetch("http://localhost:8080/rooms/my-rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setRooms(data);
    } else {
      setRooms(null);
    }
  };

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
    rooms: rooms,
  };
}
