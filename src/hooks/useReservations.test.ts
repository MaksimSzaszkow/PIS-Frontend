import { renderHook } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import { useReservations } from "./useReservations";

const allReservations = [
  {
    id: "",
    user: "test@user.com",
    date: "2023-01-09",
    time: "9:00",
    room: "10",
  },
  {
    id: "",
    user: "test1@user.com",
    date: "2023-01-09",
    time: "9:00",
    room: "101",
  },
  {
    id: "",
    user: "test2@user.com",
    date: "2023-01-09",
    time: "9:00",
    room: "102",
  },
  {
    id: "",
    user: "test3@user.com",
    date: "2023-01-09",
    time: "9:00",
    room: "103",
  },
];
const userReservations = allReservations.filter(
  (reservation) => reservation.user === "test@user.com"
);

describe("Room Reservation", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("Update reservations to all on successful fetch", async () => {
    const { result } = renderHook(() => useReservations());

    fetch.mockOnce(JSON.stringify(allReservations));

    await act(() => result.current.getAllReservations());

    expect(result.current.reservations).toEqual(allReservations);
  });

  test("Update reservations to user's on successful fetch", async () => {
    const { result } = renderHook(() => useReservations());

    fetch.mockOnce(JSON.stringify(userReservations));

    await act(() => result.current.getUserReservations());

    expect(result.current.reservations).toEqual(userReservations);
  });

  test("Refresh reservations after removing", async () => {
    const { result } = renderHook(() => useReservations());
    const fetchMock = fetch
      .mockOnce(JSON.stringify(userReservations))
      .mockOnce(JSON.stringify(userReservations));

    await act(() => result.current.deleteReservation(allReservations[0]));

    expect(
      (fetchMock.mock.calls[0][0] as string).endsWith("/delete-reservation")
    ).toBe(true);
    expect(
      (fetchMock.mock.calls[1][0] as string).endsWith("/all-reservations")
    ).toBe(true);
  });

  test("Refresh reservations after edit", async () => {
    const { result } = renderHook(() => useReservations());

    const fetchMock = fetch
      .mockOnce(JSON.stringify(userReservations))
      .mockOnce(JSON.stringify(userReservations));

    await act(() =>
      result.current.handleEditReservation(allReservations[0], {
        editDate: "",
        editUser: "",
        editTime: "",
      })
    );

    expect(
      (fetchMock.mock.calls[0][0] as string).endsWith("/edit-reservation")
    ).toBe(true);
    expect(
      (fetchMock.mock.calls[1][0] as string).endsWith("/all-reservations")
    ).toBe(true);
  });

  test("Refresh reservations after adding", async () => {
    const { result } = renderHook(() => useReservations());

    const fetchMock = fetch.mockOnce(JSON.stringify(userReservations));

    await act(() => result.current.addReservation(allReservations[0]));

    expect(
      (fetchMock.mock.calls[0][0] as string).endsWith("/add-reservation")
    ).toBe(true);
  });
});
