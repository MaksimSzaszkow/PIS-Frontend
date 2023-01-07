import { PisRoomsTableProps } from "./PisRoomsTable.types";
import s from "./PisRoomsTable.module.css";
import { Rooms } from "../../types/Rooms.types";
import PisRoomsTile from "../PisRoomsTile/PisRoomsTile";
import React, { useState } from "react";
import { useRooms } from "../../hooks/useRooms";

function PisRoomsTable({ rooms }: PisRoomsTableProps) {
  const [editRoom, setEditRoom] = useState<Rooms | null>();

  const { deleteRoom, handleEditRoom } = useRooms();

  const RoomEditPanel = () => {
    const [editName, setEditName] = useState<
      string | number | readonly string[] | undefined
    >(editRoom?.name);

    const [editSize, setEditSize] = useState<
      string | number | readonly string[] | undefined
    >(editRoom?.size);

    const handleDelete = async () => {
      if (editRoom) {
        deleteRoom(editRoom).then(() => {
          setEditRoom(null);
          window.location.reload();
        });
      }
    };

    const handleEdit = async () => {
      if (editRoom && editName && editSize) {
        handleEditRoom(editRoom, {
          editName,
          editSize,
        }).then(() => {
          setEditRoom(null);
          window.location.reload();
        });
      }
    };

    return (
      <div className={s.editPanel}>
        <button className={s.editPannelExit} onClick={() => setEditRoom(null)}>
          X
        </button>
        <h1 className={s.editPannelHeader}>Edit room: {editRoom?.name}</h1>
        <div className={s.editPannelMain}>
          <div className={s.editPannelField}>
            <h2>Name:</h2>
            <h4>{editRoom?.name}</h4>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            ></input>
          </div>
          <div className={s.editPannelField}>
            <h2>Size:</h2>
            <h4>{editRoom?.size}</h4>
            <input
              type="number"
              min="0"
              max="100"
              value={editSize}
              onChange={(e) => setEditSize(e.target.value)}
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
    <div className={s.rooms}>
      {editRoom && <RoomEditPanel />}
      <div className={s.header}>
        <p>Name:</p>
        <p>Size:</p>
      </div>
      {rooms &&
        rooms.map((room: Rooms) => (
          <PisRoomsTile key={room.id} room={room} setEditRoom={setEditRoom} />
        ))}
    </div>
  );
}

export default PisRoomsTable;
