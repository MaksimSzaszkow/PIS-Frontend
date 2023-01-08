import React, { ReactElement, useContext, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { user } from "../../config/test-user";
import { AuthContext } from "../../contexts/AuthContext";
import { useReservations } from "../../hooks/useReservations";
import PisReservationsTable from "../../components/PisReservationsTable/PisReservationsTable";

function UserReservationsPage(): ReactElement {
  const { getUserReservations, reservations } = useReservations();

  useEffect(() => {
    getUserReservations();
  }, []);

  return (
    <MainLayout>
      <PisReservationsTable reservations={reservations} />
    </MainLayout>
  );
}

export default UserReservationsPage;
