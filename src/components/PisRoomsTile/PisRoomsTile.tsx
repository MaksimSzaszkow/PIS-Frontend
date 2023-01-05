import {PisRoomsTileProps} from "./PisRoomsTile.types";
import s from "./PisRoomsTile.module.css";

function PisRoomsTile({room, onClick}: PisRoomsTileProps) {
    return (
        <div className={s.roomsTile} onClick={() => !!onClick && onClick(room)}>
            <p>{room.name}</p>
            <p>{room.size}</p>
        </div>
    );
}

export default PisRoomsTile;
