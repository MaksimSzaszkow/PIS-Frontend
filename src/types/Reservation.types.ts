export type Reservation = {
    id?: string;
    user: string;
    date: string;
    time: string;
    room: string;
};

export type Datetime = {
    date: string;
    time: string;
}

export type ReservationEditFormData = {
    editDate: string | number | readonly string[] | undefined;
    editUser: string | number | readonly string[] | undefined;
    editTime: string | number | readonly string[] | undefined;
};
