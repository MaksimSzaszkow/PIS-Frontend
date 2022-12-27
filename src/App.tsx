import logo from './logo.svg';
import './App.css';
import { useAuth } from './Auth/AuthContext';

function App() {  
  const {currentUser, logout, verifyAuth, login, data} = useAuth();

  const handleAuth = async () => {
    await verifyAuth();
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Current user: {currentUser?.username}
          </a>
          <button onClick={() => login()}>Log in</button>
          <button onClick={() => logout()}>Log out</button>
          <button onClick={() => handleAuth()}>Verify auth</button>
          <p>
            message from backend: {data}
          </p>
        </header>
      </div>
  );
}

export default App;
