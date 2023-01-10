import {Rooms} from "../../types/Rooms.types";

export type PisRoomsTableProps = {
    rooms: Rooms[];
    onElementClick?: (room: Rooms) => void;
};
