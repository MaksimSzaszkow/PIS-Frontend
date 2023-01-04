import {PisReservationTileProps} from "./PisReservationTile.types";
import s from "./PisReservationTile.module.css";

function PisReservationTile({ reservation }: PisReservationTileProps) {
    return (
        <div className={s.reservationTile}>
            <p>{reservation.date}</p>
            <p>{reservation.time}</p>
            <p>{reservation.room}</p>
            <p>{reservation.user}</p>
        </div>
    )
}

export default PisReservationTile;
