import {PisReservationsTableProps} from "./PisReservationsTable.types";
import s from "./PisReservationsTable.module.css";
import {Reservation} from "../../types/Reservation.types";
import PisReservationTile from "../PisReservationTile/PisReservationTile";
import React, {useMemo, useState} from "react";
import {useReservations} from "../../hooks/useReservations";
import {DateTime} from "luxon";

function PisReservationsTable({reservations}: PisReservationsTableProps) {
    const [editReservation, setEditReservation] = useState<null | Reservation>(
        null
    );

    const {deleteReservation, handleEditReservation} = useReservations();
    const currentDate = useMemo(() => DateTime.now().toFormat('yyyy-MM-dd'), []);

    const ReservationEditPanel = () => {
        const [editDate, setEditDate] = useState<
            string | number | readonly string[] | undefined
        >(editReservation?.date);

        const [editTime, setEditTime] = useState<
            string | number | readonly string[] | undefined
        >(editReservation?.time);

        const [editUser, setEditUser] = useState<
            string | number | readonly string[] | undefined
        >(editReservation?.user);

        const handleDelete = async () => {
            if (editReservation) {
                deleteReservation(editReservation).then(() => {
                    setEditReservation(null);
                    window.location.reload();
                });
            }
        };

        const handleEdit = async () => {
            if (editReservation && editDate && editTime && editUser) {
                handleEditReservation(editReservation, {
                    editDate,
                    editTime,
                    editUser,
                }).then(() => {
                    setEditReservation(null);
                    window.location.reload();
                });
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
                <h1 className={s.editPannelHeader}>Edit reservation:</h1>
                <h2 className={s.editPannelHeader}>
                    {editReservation?.room} - {editReservation?.user}
                </h2>
                <div className={s.editPannelMain}>
                    <div className={s.editPannelField}>
                        <h2>Date:</h2>
                        <h4>{editReservation?.date}</h4>
                        <input
                            type="date"
                            min={currentDate}
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                        ></input>
                    </div>
                    <div className={s.editPannelField}>
                        <h2>Time:</h2>
                        <h4>{editReservation?.time}</h4>
                        <input
                            type="number"
                            min="9"
                            max="17"
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
                    <button className={s.editPannelAction} onClick={() => handleEdit()}>
                        Edit
                    </button>
                    <button className={s.editPannelAction} onClick={() => handleDelete()}>
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={s.reservations}>
            {editReservation && <ReservationEditPanel/>}
            <div className={s.header}>
                <p>Date:</p>
                <p>Time:</p>
                <p>Room:</p>
                <p>User:</p>
            </div>
            {reservations &&
                reservations.map((reservation: Reservation) => (
                    <PisReservationTile
                        key={reservation.id}
                        reservation={reservation}
                        setEditReservation={setEditReservation}
                    />
                ))}
        </div>
    );
}

export default PisReservationsTable;
