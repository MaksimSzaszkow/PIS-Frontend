import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { user } from "./config/test-user";

function App() {
  const { currentUser, logout, verifyAuth, login, data } =
    useContext(AuthContext);

  const handleAuth = async () => {
    await verifyAuth();
  };

  return (
    <div className="App">
      <header className="App-header">
        Current user: {currentUser?.username}
        <button onClick={() => login(user)}>Log in</button>
        <button onClick={() => logout()}>Log out</button>
        <button onClick={() => handleAuth()}>Verify auth</button>
        <p>message from backend: {data}</p>
      </header>
    </div>
  );
}

export default App;
