import React, { ReactElement, useContext, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useReservations } from "../../hooks/useReservations";
import PisReservationsTable from "../../components/PisReservationsTable/PisReservationsTable";

function AllReservationsPage(): ReactElement {
  const { getAllReservations, reservations } = useReservations();

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <MainLayout>
      <PisReservationsTable reservations={reservations} />
    </MainLayout>
  );
}

export default AllReservationsPage;
