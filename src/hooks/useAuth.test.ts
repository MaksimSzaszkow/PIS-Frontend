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

    expect(result.current.user).toEqual({
      username: "sherlock",
      access_token: "token",
      expires_in: 3600,
      token_type: "Bearer",
    });
  });
});

describe("Logout", () => {
  test("Clears user data", async () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toEqual(null);
  });
});
