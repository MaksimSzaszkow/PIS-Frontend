import { useContext, useState } from "react";
import { Datetime } from "../types/Reservation.types";
import { RoomEditFormData, Rooms } from "../types/Rooms.types";
import { ApiContext } from "../contexts/ApiContext";
import { AuthContext } from "../contexts/AuthContext";

export function useRooms() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const { setSuccessMessage, setErrorMessage, setLoading } =
    useContext(ApiContext);
  const { token } = useContext(AuthContext);

  const getAllRooms = async () => {
    const response = await fetch("http://localhost:8080/rooms/all-rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setRooms(data);
      setErrorMessage(null);
    } else {
      setErrorMessage(await response.text());
      setRooms([]);
    }
    setLoading(false);
  };

  const deleteRoom = async (room: Rooms) => {
    const response = await fetch("http://localhost:8080/rooms/delete-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: room.id,
    });
    if (response.ok) {
      await getAllRooms();
    }
  };

  const addRoom = async (name: string, size: number) => {
    const response = await fetch("http://localhost:8080/rooms/add-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        size,
      }),
    });
    console.log(response.ok);
    if (response.ok) {
      await getAllRooms();
    }
  };

  const handleEditRoom = async (room: Rooms, editData: RoomEditFormData) => {
    const response = await fetch("http://localhost:8080/rooms/edit-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    addRoom: addRoom,
    rooms: rooms,
  };
}
