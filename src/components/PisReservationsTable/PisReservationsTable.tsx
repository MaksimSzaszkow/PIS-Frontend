import { PisReservationsTableProps } from "./PisReservationsTable.types";
import s from "./PisReservationsTable.module.css";
import { Reservation } from "../../types/Reservation.types";
import PisReservationTile from "../PisReservationTile/PisReservationTile";
import React, { useState } from "react";
import { useReservations } from "../../hooks/useReservations";

function PisReservationsTable({ reservations }: PisReservationsTableProps) {
  const [editReservation, setEditReservation] = useState<null | Reservation>(
    null
  );

  const { deleteReservation } = useReservations();

  const ReservationEditPanel = () => {
    const [editDate, setEditDate] = useState<
      string | number | readonly string[] | undefined
    >("");

    const [editTime, setEditTime] = useState<
      string | number | readonly string[] | undefined
    >("");

    const [editUser, setEditUser] = useState<
      string | number | readonly string[] | undefined
    >("");

    const handleDelete = async () => {
      if (editReservation) {
        await deleteReservation(editReservation);
      }
    };

    return (
      <div className={s.editPanel}>
        <button
          className={s.editPannelExit}
          onClick={() => setEditReservation(null)}
        >
          X
        </button>
        <h1 className={s.editPannelHeader}>
          Edit room: {editReservation?.room}
        </h1>
        <div className={s.editPannelMain}>
          <div className={s.editPannelField}>
            <h2>Date:</h2>
            <h4>{editReservation?.date}</h4>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            ></input>
          </div>
          <div className={s.editPannelField}>
            <h2>Time:</h2>
            <h4>{editReservation?.time}</h4>
            <input
              type="number"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            ></input>
          </div>
          <div className={s.editPannelField}>
            <h2>User:</h2>
            <h4>{editReservation?.user}</h4>
            <input
              type="text"
              value={editUser}
              onChange={(e) => setEditUser(e.target.value)}
            ></input>
          </div>
        </div>
        <div className={s.editPannelActions}>
          <button className={s.editPannelAction}>Edit</button>
          <button className={s.editPannelAction} onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={s.reservations}>
      {editReservation && <ReservationEditPanel />}
      <div className={s.header}>
        <p>Date:</p>
        <p>Time:</p>
        <p>Room:</p>
        <p>User:</p>
      </div>
      {reservations &&
        reservations.map((reservation: Reservation, i: number) => (
          <PisReservationTile
            key={i}
            reservation={reservation}
            setEditReservation={setEditReservation}
          />
        ))}
    </div>
  );
}

export default PisReservationsTable;
