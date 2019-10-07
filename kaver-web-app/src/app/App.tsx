import React from 'react';
import logo from '../kaver-logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Logo-block">
          <img src={logo} className="App-logo" alt="Логотип" />
          <span className="App-logo-text">KAVER</span>
        </div>
        <div className="Login-block">
          <span className="App-login-text">Log in</span>
        </div>
      </header>
      <div id="main">
        <div className="Card"></div>
      </div>
      <div className="App-footer">
        <div className="Copyright">Copyright</div>
      </div>
    </div>
  );
}

export default App;
