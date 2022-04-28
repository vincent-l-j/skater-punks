import { useState } from 'react';
import React from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
  <div className="App">
    <div>"Helllo"</div>
    <NavBar accounts={accounts} setAccounts={setAccounts} />
    <MainMint accounts={accounts} setAccounts={setAccounts} />
  </div>
  );
}

export default App;