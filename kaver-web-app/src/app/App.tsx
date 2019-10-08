import React from 'react';
import logo from '../kaver-logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Logo-block">
          <img src={logo} className="App-logo" alt="Логотип" />
          <span className="App-logo-text">KAVER</span>
        </div>
        <div className="Search-block">
          <TextField id="time" type="text"/>
          <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon"/>
        </div>
        <div className="Login-block">
          <span className="App-login-text">Log in</span>
        </div>
      </header>
      <div id="main">
        <div className="Card"></div>
      </div>
    </div>
  );
}

export default App;
