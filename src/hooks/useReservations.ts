import { useContext, useState } from "react";
import {
  ReservationEditFormData,
  Reservation,
} from "../types/Reservation.types";
import { ApiContext } from "../contexts/ApiContext";
import { AuthContext } from "../contexts/AuthContext";

export function useReservations() {
  const { setErrorMessage, setSuccessMessage } = useContext(ApiContext);
  const { token } = useContext(AuthContext);

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const getAllReservations = async () => {
    const response = await fetch(
      "http://localhost:8080/reservation/all-reservations",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      setErrorMessage(null);
      const data = await response.json();
      setReservations(data);
    } else {
      setReservations([]);
      setErrorMessage("Error fetching reservations");
    }
  };

  const getUserReservations = async () => {
    const response = await fetch(
      "http://localhost:8080/reservation/my-reservations",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      setErrorMessage(null);
      const data = await response.json();
      setReservations(data);
    } else {
      setErrorMessage("Error fetching reservations");
      setReservations([]);
    }
  };

  const deleteReservation = async (reservation: Reservation) => {
    const response = await fetch(
      "http://localhost:8080/reservation/delete-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: reservation.id,
      }
    );
    if (response.ok) {
      await getAllReservations();
      setSuccessMessage("Reservation deleted");
      setErrorMessage(null);
    } else {
      setErrorMessage("Error deleting reservation");
      setSuccessMessage(null);
    }
  };

  const handleEditReservation = async (
    reservation: Reservation,
    editData: ReservationEditFormData
  ) => {
    const response = await fetch(
      "http://localhost:8080/reservation/edit-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reservationId: reservation.id,
          ...editData,
        }),
      }
    );
    if (response.ok) {
      await getAllReservations();
    }
  };

  const addReservation = async (reservation: Reservation) => {
    const response = await fetch(
      "http://localhost:8080/reservation/add-reservation",
      {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      setSuccessMessage("Reservation added");
      setErrorMessage(null);
    } else {
      setErrorMessage("Error adding reservation");
      setSuccessMessage(null);
    }
  };

  return {
    getAllReservations: getAllReservations,
    getUserReservations: getUserReservations,
    deleteReservation: deleteReservation,
    handleEditReservation: handleEditReservation,
    addReservation: addReservation,
    reservations: reservations,
  };
}
