import React, { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useReservations } from "../../hooks/useReservations";
import { useRooms } from "../../hooks/useRooms";
import "./AdminPanel.css";
import PisReservationsTable from "../../components/PisReservationsTable/PisReservationsTable";
import PisRoomsTable from "../../components/PisRoomsTable/PisRoomsTable";

const AdminPanel = () => {
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<number>(1);
  const { getAllReservations, reservations } = useReservations();
  const { getAllRooms, rooms, addRoom } = useRooms();

  useEffect(() => {
    getAllReservations();
    getAllRooms();
  }, []);

  const handleAddRoom = () => {
    if (name && size > 0) {
      addRoom(name, size);
    }
  };

  return (
    <MainLayout>
      <div className="management_main">
        <div className="management">
          <h1>Manage rooms</h1>
          <div className="management_addroom">
            <h1>Add room</h1>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="number"
              min="1"
              max="99"
              value={size}
              placeholder="Size"
              onChange={(e) => setSize(Number(e.target.value))}
            ></input>
            <button onClick={() => handleAddRoom()}>Add Room</button>
          </div>
          <PisRoomsTable rooms={rooms} />
        </div>
        <div className="management">
          <h1>Manage reservations</h1>
          <PisReservationsTable reservations={reservations} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPanel;
