import {PisTeamsTableProps} from "./PisTeamsTable.types";
import s from "./PisTeamsTable.module.css";
import {Teams} from "../../types/Teams.types";
import PisTeamsTile from "../PisTeamsTile/PisTeamsTile";
import React, {useState} from "react";
import {useTeams} from "../../hooks/useTeams";

function PisTeamsTable({teams, onElementClick}: PisTeamsTableProps) {
    const [editTeam, setEditTeam] = useState<Teams | null>();

    const {deleteTeam, handleEditTeam} = useTeams();

    const TeamEditPanel = () => {
        const [editName, setEditName] = useState<
            string | number | readonly string[] | undefined
        >(editTeam?.name);

        const [editSize, setEditSize] = useState<
            string | number | readonly string[] | undefined
        >(editTeam?.size);

        const handleDelete = async () => {
            if (editTeam) {
                deleteTeam(editTeam).then(() => {
                    setEditTeam(null);
                    window.location.reload();
                });
            }
        };

        const handleEdit = async () => {
            if (editTeam && editName && editSize) {
                handleEditTeam(editTeam, {
                    editName,
                    editSize,
                }).then(() => {
                    setEditTeam(null);
                    window.location.reload();
                });
            }
        };

        return (
            <div className={s.editPanel}>
                <button className={s.editPannelExit} onClick={() => setEditTeam(null)}>
                    X
                </button>
                <h1 className={s.editPannelHeader}>Edit team: {editTeam?.name}</h1>
                <div className={s.editPannelMain}>
                    <div className={s.editPannelField}>
                        <h2>Name:</h2>
                        <h4>{editTeam?.name}</h4>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        ></input>
                    </div>
                    <div className={s.editPannelField}>
                        <h2>Size:</h2>
                        <h4>{editTeam?.size}</h4>
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
        <div className={s.teams}>
            {editTeam && <TeamEditPanel/>}
            <div className={s.header}>
                <p>Name:</p>
                <p>Size:</p>
            </div>
            {teams &&
                teams.map((team: Teams) => (
                    <PisTeamsTile key={team.id} team={team} setEditTeam={setEditTeam}
                                  onClick={onElementClick}/>
                ))}
        </div>
    );
}

export default PisTeamsTable;
