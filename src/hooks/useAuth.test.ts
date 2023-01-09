import { defaultUser, useAuth } from "./useAuth";
import { renderHook } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";

const adminUser = {
  email: "test@user.com",
  role: "admin",
  authorized: true,
};

const normalUser = {
  email: "test@user.com",
  role: "",
  authorized: true,
};

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: (auth: FirebaseApp, fn: (user: User) => Promise<any>) => {
    observerFn = fn;
  },
  getAuth: () => {},
  signInWithEmailAndPassword: (email: string, password: string) => {},
  createUserWithEmailAndPassword: (email: string, password: string) => {},
  signOut: () => {},
}));

class FirebaseUserMock {
  email;
  role;

  constructor(email: string, role: string) {
    this.email = email;
    this.role = role;
  }

  getIdToken() {
    return "";
  }

  getIdTokenResult() {
    return { claims: { role: this.role } };
  }
}

let observerFn: Function;

describe("Authorization", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test("Update user info on successful login", async () => {
    const { result } = renderHook(() => useAuth());

    fetch.mockOnce(
      JSON.stringify({
        token: "",
      })
    );

    await act(
      async () => await result.current.login("test@user.com", "password123")
    );

    expect(result.current.loading).toBe(true);

    await act(async () =>
      observerFn(new FirebaseUserMock("test@user.com", "admin"))
    );

    expect(result.current.user).toEqual(adminUser);
    expect(result.current.loading).toBe(false);
  });

  test("Update user info on successful register", async () => {
    const { result } = renderHook(() => useAuth());

    fetch.mockOnce(
      JSON.stringify({
        token: "",
      })
    );

    await act(
      async () => await result.current.register("test@user.com", "password123")
    );

    expect(result.current.loading).toBe(true);

    await act(async () =>
      observerFn(new FirebaseUserMock("test@user.com", ""))
    );

    expect(result.current.user).toEqual(normalUser);
    expect(result.current.loading).toBe(false);
  });

  test("Clear user info on successful logout", async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => await result.current.logout());

    expect(result.current.loading).toBe(true);

    await act(async () => observerFn(null));

    expect(result.current.user).toEqual(defaultUser);
    expect(result.current.loading).toBe(false);
  });
});
