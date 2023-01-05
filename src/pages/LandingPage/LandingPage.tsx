import React, {ReactElement, useContext, useEffect} from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import s from "./LandingPage.module.css";
import PisButton from "../../components/PisButton/PisButton";
import {WORKING_HOURS} from "../../config/datetime-config";
import {user} from "../../config/test-user";
import {AuthContext} from "../../contexts/AuthContext";
import {Datetime, Reservation} from "../../types/Reservation.types";
import {useReservations} from "../../hooks/useReservations";
import {Rooms} from "../../types/Rooms.types";
import PisRoomsTable from "../../components/PisRoomsTable/PisRoomsTable";


function LandingPage(): ReactElement {


    const {login} = useContext(AuthContext);
    const {checkAvailability, addReservation} = useReservations();

    const [availableRooms, setAvailableRooms] = React.useState<Rooms[]>([]);
    const [selectedDatetime, setSelectedDatetime] = React.useState<Datetime>({
        date: "",
        time: "",
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            date: { value: Date };
            time: { value: string };
        }
        const datetime: Datetime = {
            date: "14.03.2023",
            time: target.time.value
        }
        setSelectedDatetime(datetime);
        const data = await checkAvailability(datetime);
        setAvailableRooms(data);
    }

    const onSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        console.log(e.target.value)
        const newDatetime: Datetime = {
            ...selectedDatetime,
            time: e.target.value
        }
        setSelectedDatetime(newDatetime);
        const data = await checkAvailability(newDatetime);
        setAvailableRooms(data);
    }

    const onRoomClick = async (room: Rooms) => {
        const reservation: Reservation = {
            user: "mboruwa",
            date: selectedDatetime.date,
            time: selectedDatetime.time,
            room: room.id,
        }
        await addReservation(reservation);
        const data = await checkAvailability(selectedDatetime);
        setAvailableRooms(data);
    }


    useEffect(() => {
        login(user);
    }, []);


    return (
        <MainLayout>
            <form className={s.form} onSubmit={onSubmit}>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date"/>
                <label htmlFor="time">Time</label>
                <select name="time" id="time" onChange={onSelectChange}>
                    {WORKING_HOURS.map((hour, index) => (
                        <option key={`hour-option-key-${index}`} value={hour.value}>{hour.label}</option>
                    ))}
                </select>
                <PisButton type="submit"> Search </PisButton>
            </form>
            {availableRooms.length > 0 && (
                <PisRoomsTable rooms={availableRooms} onElementClick={onRoomClick}/>
            )}
        </MainLayout>
    );
}

export default LandingPage;