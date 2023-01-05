import { PisRoomsTableProps } from "./PisRoomsTable.types";
import s from "./PisRoomsTable.module.css";
import { Rooms } from "../../types/Rooms.types";
import PisRoomsTile from "../PisRoomsTile/PisRoomsTile";
import React from "react";

function PisRoomsTable({ rooms }: PisRoomsTableProps) {
  return (
    <div className={s.rooms}>
      <div className={s.header}>
        <p>Name:</p>
        <p>Size:</p>
      </div>
      {rooms &&
        rooms.map((room: Rooms, i: number) => (
          <PisRoomsTile key={i} room={room} />
        ))}
    </div>
  );
}

export default PisRoomsTable;
