import { useState } from "react";

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

  return {
    getAllRooms: getAllRooms,
    getUserRooms: getUserRooms,
    rooms: rooms,
  };
}
