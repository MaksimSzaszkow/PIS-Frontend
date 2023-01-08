export type Rooms = {
  id: string;
  size: number;
  name: string;
};

export type RoomEditFormData = {
  editName: string | number | readonly string[] | undefined;
  editSize: string | number | readonly string[] | undefined;
};
