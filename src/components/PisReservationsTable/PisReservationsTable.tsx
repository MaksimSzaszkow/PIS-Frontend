import {PisReservationsTableProps} from "./PisReservationsTable.types";
import s from "./PisReservationsTable.module.css";
import {Reservation} from "../../types/Reservation.types";
import PisReservationTile from "../PisReservationTile/PisReservationTile";
import React from "react";

function PisReservationsTable({reservations}: PisReservationsTableProps) {
    return (
        <div className={s.reservations}>
            <div className={s.header}>
                <p>Date:</p>
                <p>Time:</p>
                <p>Room:</p>
                <p>User:</p>
            </div>
            {reservations.map(
                (reservation: Reservation) => <PisReservationTile reservation={reservation}/>
            )}
        </div>

    )
}

export default PisReservationsTable;
