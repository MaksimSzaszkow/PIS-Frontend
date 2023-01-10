export type Teams = {
    id: string;
    size: number;
    name: string;
  };
  
  export type TeamEditFormData = {
    editName: string | number | readonly string[] | undefined;
    editSize: string | number | readonly string[] | undefined;
  };
  