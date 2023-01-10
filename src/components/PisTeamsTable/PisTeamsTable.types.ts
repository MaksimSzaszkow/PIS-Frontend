import {Teams} from "../../types/Teams.types";

export type PisTeamsTableProps = {
    teams: Teams[];
    onElementClick?: (team: Teams) => void;
};
