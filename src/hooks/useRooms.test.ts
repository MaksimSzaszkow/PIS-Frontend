import { renderHook } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import { useRooms } from "./useRooms";
export type Rooms = {
  id: string;
  size: number;
  name: string;
};

const rooms = [
  {
    id: "",
    size: 2,
    name: "100",
  },
  {
    id: "",
    size: 3,
    name: "101",
  },
  {
    id: "",
    size: 4,
    name: "102",
  },
];

const myRooms = [
  {
    id: "",
    size: 3,
    name: "101",
  },
];
describe("Room CRUD", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("Update rooms to all on successful fetch", async () => {
    const { result } = renderHook(() => useRooms());

    fetch.mockOnce(JSON.stringify(rooms));

    await act(() => result.current.getAllRooms());

    expect(result.current.rooms).toEqual(rooms);
  });

  test("Update rooms to user's on successful fetch", async () => {
    const { result } = renderHook(() => useRooms());

    fetch.mockOnce(JSON.stringify(myRooms));

    await act(() => result.current.getUserRooms());

    expect(result.current.rooms).toEqual(myRooms);
  });

  test("Update rooms to available on successful fetch", async () => {
    const { result } = renderHook(() => useRooms());
    fetch.mockOnce(JSON.stringify(rooms));

    await act(() =>
      result.current.checkAvailableRooms({ date: "2023-09-01", time: "9:00" })
    );

    expect(result.current.rooms).toEqual(rooms);
  });

  test("Refresh rooms after removing", async () => {
    const { result } = renderHook(() => useRooms());

    const fetchMock = fetch
      .mockOnce(JSON.stringify(rooms))
      .mockOnce(JSON.stringify(rooms));

    await act(() => result.current.deleteRoom(rooms[0]));

    expect(
      (fetchMock.mock.calls[0][0] as string).endsWith("/delete-room")
    ).toBe(true);
    expect((fetchMock.mock.calls[1][0] as string).endsWith("/all-rooms")).toBe(
      true
    );
  });

  test("Refresh rooms after edit", async () => {
    const { result } = renderHook(() => useRooms());

    const fetchMock = fetch
      .mockOnce(JSON.stringify(rooms))
      .mockOnce(JSON.stringify(rooms));

    await act(() =>
      result.current.handleEditRoom(rooms[0], { editName: "101", editSize: 3 })
    );

    expect((fetchMock.mock.calls[0][0] as string).endsWith("/edit-room")).toBe(
      true
    );
    expect((fetchMock.mock.calls[1][0] as string).endsWith("/all-rooms")).toBe(
      true
    );
  });
});
