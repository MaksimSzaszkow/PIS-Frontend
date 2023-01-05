import {Rooms} from "../../types/Rooms.types";

export type PisRoomsTileProps = {
    room: Rooms;
    onClick?: (room: Rooms) => void;
};
