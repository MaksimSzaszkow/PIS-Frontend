import { PisTeamsTableProps } from "./PisTeamsTable.types";
import s from "./PisTeamsTable.module.css";
import { Teams } from "../../types/Teams.types";
import PisTeamsTile from "../PisTeamsTile/PisTeamsTile";
import React, { useState } from "react";
import { useTeams } from "../../hooks/useTeams";

function PisTeamsTable({ teams, onElementClick }: PisTeamsTableProps) {
    const [editTeam, setEditTeam] = useState<Teams | null>();

    const { deleteTeam, handleEditTeam } = useTeams();

    const TeamEditPanel = () => {
        const [editName, setEditName] = useState<
            string | string | string | string[] | readonly string[] | undefined
        >(editTeam?.name);

        const [editTeamLeader, setEditTeamLeader] = useState<
            string | string | string | string[] | readonly string[] | undefined
        >(editTeam?.teamLeader);

        const [editTeamMembers, setEditTeamMembers] = useState<
            string | string | string | string[] | readonly string[] | undefined
        >(editTeam?.teamMembers);

        const handleDelete = async () => {
            if (editTeam) {
                deleteTeam(editTeam).then(() => {
                    setEditTeam(null);
                    window.location.reload();
                });
            }
        };

        const handleEdit = async () => {
            if (editTeam && editName && editTeamLeader && editTeamMembers) {
                handleEditTeam(editTeam, {
                    editName,
                    editTeamLeader,
                    editTeamMembers
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
                        <h2>Team Leader:</h2>
                        <h4>{editTeam?.teamLeader}</h4>
                        <input
                            type="text"
                            value={editTeamLeader}
                            onChange={(e) => setEditTeamLeader(e.target.value)}
                        ></input>
                    </div>
                    <div className={s.editPannelField}>
                        <h2>Team Members:</h2>
                        <h4>{editTeam?.teamMembers}</h4>
                        <input
                            type="text"
                            value={editTeamMembers}
                            onChange={(e) => setEditTeamMembers(e.target.value)}
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
            {editTeam && <TeamEditPanel />}
            <div className={s.header}>
                <p>Name:</p>
                <p>Team Leader:</p>
                <p>Team Members:</p>
            </div>
            {teams &&
                teams.map((team: Teams) => (
                    <PisTeamsTile key={team.id} team={team} setEditTeam={setEditTeam}
                        onClick={onElementClick} />
                ))}
        </div>
    );
}

export default PisTeamsTable;
