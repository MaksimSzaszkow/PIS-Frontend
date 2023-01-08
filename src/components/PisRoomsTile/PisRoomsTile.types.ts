import {Dispatch, SetStateAction} from "react";
import {Rooms} from "../../types/Rooms.types";

export type PisRoomsTileProps = {
    room: Rooms;
    setEditRoom: Dispatch<SetStateAction<Rooms | null | undefined>>;
    onClick?: (room: Rooms) => void;
};
