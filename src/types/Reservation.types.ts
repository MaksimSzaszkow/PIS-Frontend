export type Reservation = {
    user: string;
    date: string;
    time: string;
    room: string;
};

export type ReservationWithId = Reservation & {
    id: string;
}

export type Datetime = {
    date: string;
    time: string;
}