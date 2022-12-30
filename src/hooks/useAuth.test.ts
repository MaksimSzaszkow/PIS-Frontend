import { useAuth } from "./useAuth";
import { renderHook } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

describe("Authorization", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("Update user info on login with good credentials", async () => {
    const { result } = renderHook(() => useAuth());

    fetch.mockResponseOnce(
      JSON.stringify({
        username: "sherlock",
        access_token: "token",
        expires_in: 3600,
        token_type: "Bearer",
      })
    );

    await act(
      async () =>
        await result.current.login({
          username: "sherlock",
          password: "password",
        })
    );

    expect(result.current.currentUser).toEqual({
      username: "sherlock",
      access_token: "token",
      expires_in: 3600,
      token_type: "Bearer",
    });
  });

  test("Update data to 'Error during login' on login failure", async () => {
    const { result } = renderHook(() => useAuth());

    fetch.mockRejectOnce(async () => "error");

    await act(
      async () =>
        await result.current.login({
          username: "sherlock",
          password: "password",
        })
    );

    expect(result.current.data).toEqual("Error during login");
  });
});

describe("Logout", () => {
  test("Clears user data", async () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.currentUser).toEqual(null);
  });
});

describe("Verify auth state", () => {
  test("Update data to backend message if user was authorized", async () => {
    const { result } = renderHook(() => useAuth());

    const message = JSON.stringify({ test: "message from backend" });

    fetch.mockResponseOnce(message);

    await act(async () => await result.current.verifyAuth());

    expect(result.current.data).toEqual(message);
  });

  test("Update data to error message if user wasnt authorized", async () => {
    const { result } = renderHook(() => useAuth());

    fetch.mockRejectOnce(async () => "error");

    await act(async () => await result.current.verifyAuth());

    expect(result.current.data).toEqual("Unauthorized");
  });
});
