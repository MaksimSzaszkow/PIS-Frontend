export type Teams = {
    id: string;
    name: string;
    teamLeader: string;
    teamMembers: string[];
  };
  
  export type TeamEditFormData = {
    editName: string | string | string | string[] | readonly string[] | undefined;
    editTeamLeader: string | string | string | string[] | readonly string[] | undefined;
    editTeamMembers: string | string | string | string[] | readonly string[] | undefined;
  };
  