import "./App.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function App() {
  const { user, logout, login } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        Current user: {user?.username}
        <button onClick={() => login(user)}>Log in</button>
        <button onClick={() => logout()}>Log out</button>
      </header>
    </div>
  );
}

export default App;
