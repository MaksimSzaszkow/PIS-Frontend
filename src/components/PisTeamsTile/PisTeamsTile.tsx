import {PisTeamsTileProps} from "./PisTeamsTile.types";
import s from "./PisTeamsTile.module.css";

function PisTeamsTile({team, setEditTeam, onClick}: PisTeamsTileProps) {
    return (
        <div className={s.teamsTile} onClick={() => !!onClick ? onClick(team) : setEditTeam(team)}>
            <p>{team.name}</p>
            <p>{team.teamLeader}</p>
            <p>{team.teamMembers}</p>
        </div>
    );
}

export default PisTeamsTile;
