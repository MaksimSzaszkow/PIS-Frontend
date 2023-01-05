import { Dispatch, SetStateAction } from "react";
import { Reservation } from "../../types/Reservation.types";

export type PisReservationTileProps = {
  reservation: Reservation;
  setEditReservation: Dispatch<SetStateAction<Reservation | null>>;
};
