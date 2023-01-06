import React, {ReactElement, useContext, useEffect, useMemo} from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import s from "./LandingPage.module.css";
import {WORKING_HOURS} from "../../config/datetime-config";
import {user} from "../../config/test-user";
import {AuthContext} from "../../contexts/AuthContext";
import {Datetime, Reservation} from "../../types/Reservation.types";
import {useReservations} from "../../hooks/useReservations";
import {Rooms} from "../../types/Rooms.types";
import PisRoomsTable from "../../components/PisRoomsTable/PisRoomsTable";
import {DateTime} from 'luxon'
import {useRooms} from "../../hooks/useRooms";


function LandingPage(): ReactElement {

    const {login} = useContext(AuthContext);
    const {addReservation, reservationsSuccessMessage, reservationsErrorMessage} = useReservations();
    const {rooms, roomsErrorMessage, checkAvailableRooms} = useRooms();

    const currentDate = useMemo(() => DateTime.now().toFormat('yyyy-MM-dd'), []);
    const messages = useMemo(() => {
        return [reservationsSuccessMessage, reservationsErrorMessage, roomsErrorMessage]
    }, [reservationsSuccessMessage, reservationsErrorMessage, roomsErrorMessage]);
    const [selectedDatetime, setSelectedDatetime] = React.useState<Datetime>({
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        time: "9",
    });

    const onSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const newDatetime: Datetime = {
            ...selectedDatetime,
            time: e.target.value
        }
        setSelectedDatetime(newDatetime);
        await checkAvailableRooms(newDatetime);
    }

    const onCalendarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const newDatetime: Datetime = {
            ...selectedDatetime,
            date: e.target.value
        }
        setSelectedDatetime(newDatetime);
        await checkAvailableRooms(newDatetime);
    }

    const onRoomClick = async (room: Rooms) => {
        const reservation: Reservation = {
            user: "mboruwa",
            date: selectedDatetime.date,
            time: selectedDatetime.time,
            room: room.name,
        }
        await addReservation(reservation);
        await checkAvailableRooms(selectedDatetime);
    }

    useEffect(() => {
        login(user);
        checkAvailableRooms(selectedDatetime);
    }, []);

    return (
        <MainLayout>
            <form className={s.form}>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    min={currentDate}
                    defaultValue={currentDate}
                    onChange={onCalendarChange}
                />
                <label htmlFor="time">Time</label>
                <select name="time" id="time" onChange={onSelectChange}>
                    {WORKING_HOURS.map((hour, index) => (
                        <option key={`hour-option-key-${index}`} value={hour.value}>{hour.label}</option>
                    ))}
                </select>
            </form>
            {rooms.length > 0 && messages.every(message => message === null) && (
                <PisRoomsTable rooms={rooms} onElementClick={onRoomClick}/>
            )}
            {roomsErrorMessage !== null &&
                <div className={s.error}>{roomsErrorMessage}</div>
            }
            {reservationsErrorMessage !== null && (
                <div className={s.error}>{reservationsErrorMessage}</div>
            )}
            {reservationsSuccessMessage !== null && (
                <div className={s.success}>{reservationsSuccessMessage}</div>
            )}

        </MainLayout>
    );
}

export default LandingPage;