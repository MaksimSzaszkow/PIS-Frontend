import { useContext, useState } from "react";
import { Datetime } from "../types/Reservation.types";
import { TeamEditFormData, Teams } from "../types/Teams.types";
import { ApiContext } from "../contexts/ApiContext";
import { AuthContext } from "../contexts/AuthContext";

export function useTeams() {
  const [teams, setTeams] = useState<Teams[]>([]);
  const { setSuccessMessage, setErrorMessage, setLoading } =
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

  const getUserRooms = async () => {
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

  const checkAvailableTeams = async (datetime: Datetime) => {
    setLoading(true);
    setSuccessMessage(null);
    const response = await fetch(
      "http://localhost:8080/teams/get-available-teams",
      {
        method: "POST",
        body: JSON.stringify(datetime),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setTeams(data);
      setErrorMessage(null);
    } else {
      setErrorMessage(await response.text());
      setTeams([]);
    }
    setLoading(false);
  };

  const deleteRoom = async (room: Teams) => {
    const response = await fetch("http://localhost:8080/teams/delete-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: room.id,
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

  const handleEditTeam = async (room: Teams, editData: TeamEditFormData) => {
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
    checkAvailableTeams: checkAvailableTeams,
    addTeam: addTeam,
    teams: teams,
  };
}
