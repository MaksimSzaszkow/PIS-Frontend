import { PisReservationTileProps } from "./PisReservationTile.types";
import s from "./PisReservationTile.module.css";

function PisReservationTile({
  reservation,
  setEditReservation,
}: PisReservationTileProps) {
  return (
    <div
      className={s.reservationTile}
      onClick={() => setEditReservation(reservation)}
    >
      <p>{reservation.date}</p>
      <p>{reservation.time}</p>
      <p>{reservation.room}</p>
      <p>{reservation.user}</p>
    </div>
  );
}

export default PisReservationTile;
