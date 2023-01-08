import { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function LandingPage(): ReactElement {
  const { login, register } = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPasswd, setLoginPasswd] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPasswd, setRegisterPasswd] = useState("");

  return (
    <div style={s.container}>
      <div style={s.form}>
        <h1>Login</h1>
        <div style={s.group}>
          <div>Email</div>
          <input
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div style={s.group}>
          <div>Password</div>
          <input
            value={loginPasswd}
            onChange={(e) => setLoginPasswd(e.target.value)}
            type="password"
          />
        </div>
        <button style={s.button} onClick={() => login(loginEmail, loginPasswd)}>
          Login
        </button>
      </div>
      <div style={s.form}>
        <h1>Register</h1>
        <div style={s.group}>
          <div>Email</div>
          <input
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>
        <div style={s.group}>
          <div>Password</div>
          <input
            value={registerPasswd}
            onChange={(e) => setRegisterPasswd(e.target.value)}
            type="password"
          />
        </div>
        <button
          style={s.button}
          onClick={() => register(registerEmail, registerPasswd)}
        >
          Register
        </button>
      </div>
    </div>
  );
}

const s: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10vh 10vw",
    flexWrap: "wrap",
  },
  form: {
    width: "20%",
    minWidth: "350px",
    display: "flex",
    flexDirection: "column",
    padding: "0 50px",
    margin: "50px 0",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
  },
  button: {
    marginTop: "10px",
  },
};
export default LandingPage;
