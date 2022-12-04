import {useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from './Auth/AuthContext';

function App() {
  const {currentUser, logout, verifyAuth} = useAuth();

  const [data, setData] = useState("");

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
            Current user: {currentUser?.email}
          </a>
          <button onClick={() => logout()}>Log out</button>
          <button onClick={() => verifyAuth()}>Verify auth</button>
          <p>
            message from backend: {data}
          </p>
        </header>
      </div>
  );
}

export default App;
