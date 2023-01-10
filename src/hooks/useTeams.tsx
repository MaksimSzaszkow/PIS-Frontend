import { useContext, useState } from "react";
import { TeamEditFormData, Teams } from "../types/Teams.types";
import { ApiContext } from "../contexts/ApiContext";
import { AuthContext } from "../contexts/AuthContext";

export function useTeams() {
  const [teams, setTeams] = useState<Teams[]>([]);
  const { setErrorMessage } =
    useContext(ApiContext);
  const { token } = useContext(AuthContext);

  const getAllTeams = async () => {
    const response = await fetch("http://localhost:8080/teams/all-teams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTeams(data);
      setErrorMessage(null);
    } else {
      setTeams([]);
      setErrorMessage("Error fetching teams");
    }
  };

  const getUserTeams = async () => {
    const response = await fetch("http://localhost:8080/teams/my-teams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTeams(data);
      setErrorMessage(null);
    } else {
      setTeams([]);
      setErrorMessage("Error fetching teams");
    }
  };

  const deleteTeam = async (team: Teams) => {
    const response = await fetch("http://localhost:8080/teams/delete-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: team.id,
    });
    if (response.ok) {
      await getAllTeams();
    }
  };

  const addTeam = async (name: string, size: number) => {
    const response = await fetch("http://localhost:8080/teams/add-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        size,
      }),
    });
    console.log(response.ok);
    if (response.ok) {
      await getAllTeams();
    }
  };

  const handleEditTeam = async (team: Teams, editData: TeamEditFormData) => {
    const response = await fetch("http://localhost:8080/teams/edit-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        teamId: team.id,
        ...editData,
      }),
    });
    if (response.ok) {
      await getAllTeams();
    }
  };

  return {
    getAllTeams: getAllTeams,
    getUserTeams: getUserTeams,
    deleteTeam: deleteTeam,
    handleEditTeam: handleEditTeam,
    addTeam: addTeam,
    teams: teams,
  };
}
