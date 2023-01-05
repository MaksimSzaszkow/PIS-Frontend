import { PisRoomsTileProps } from "./PisRoomsTile.types";
import s from "./PisRoomsTile.module.css";

function PisRoomsTile({ room }: PisRoomsTileProps) {
  return (
    <div className={s.roomsTile}>
      <p>{room.name}</p>
      <p>{room.size}</p>
    </div>
  );
}

export default PisRoomsTile;
