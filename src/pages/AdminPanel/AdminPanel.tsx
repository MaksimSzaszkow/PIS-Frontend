import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { user } from "../../config/test-user";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useReservations } from "../../hooks/useReservations";
import { useRooms } from "../../hooks/useRooms";
import "./AdminPanel.css";
import PisReservationsTable from "../../components/PisReservationsTable/PisReservationsTable";
import PisRoomsTable from "../../components/PisRoomsTable/PisRoomsTable";

const AdminPanel = () => {
  const { login } = useContext(AuthContext);

  const { getAllReservations, reservations } = useReservations();
  const { getAllRooms, rooms } = useRooms();

  useEffect(() => {
    login(user);
    getAllReservations();
    getAllRooms();
  }, []);

  return (
    <MainLayout>
      <div className="management_main">
        <div className="management">
          <h1>Manage rooms</h1>
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
