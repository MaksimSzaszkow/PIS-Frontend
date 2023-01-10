import {Dispatch, SetStateAction} from "react";
import {Teams} from "../../types/Teams.types";

export type PisTeamsTileProps = {
    team: Teams;
    setEditTeam: Dispatch<SetStateAction<Teams | null | undefined>>;
    onClick?: (team: Teams) => void;
};
