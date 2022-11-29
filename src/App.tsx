import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}`).then((res) => {
      setData(res.data);
    })
  }, [])

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
          Learn React
        </a>
        <p>
          message from backend: {data}
        </p>
      </header>
    </div>
  );
}

export default App;
