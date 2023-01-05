import { useState } from "react";
import { Reservation } from "../types/Reservation.types";

export function useReservations() {
  const [reservations, setReservations] = useState<any>([]);

  const getAllReservations = async () => {
    const response = await fetch(
      "http://localhost:8080/reservation/all-reservations",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setReservations(data);
    } else {
      setReservations(null);
    }
  };

  const getUserReservations = async () => {
    const response = await fetch(
      "http://localhost:8080/reservation/my-reservations",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setReservations(data);
    } else {
      setReservations(null);
    }
  };

  const deleteReservation = async (reservation: Reservation) => {
    const response = await fetch(
      "http://localhost:8080/reservation/delete-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
        },
        body: JSON.stringify({
          user: reservation.user,
          date: reservation.date,
          time: reservation.time,
          room: reservation.room,
        }),
      }
    );
  };

  return {
    getAllReservations: getAllReservations,
    getUserReservations: getUserReservations,
    deleteReservation: deleteReservation,
    reservations: reservations,
  };
}
