import React from 'react';
import logo from '../kaver-logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignInAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TextField, Card, CardContent, Typography, Fab, Drawer } from '@material-ui/core';

var isDrawerOpen = true;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Left-block-placeholder"></div>
        <div className="Logo-block">
          <img src={logo} className="App-logo" alt="Логотип" />
          <span className="App-logo-text">KAVER</span>
        </div>
        <div className="Login-block">
          <FontAwesomeIcon icon={faSignInAlt} size="3x" className="Sign-in-icon" />
        </div>
      </header>
      <div id="main">
        <div className="Favorites-block">
          <h1>Favorites Kavers</h1>
        </div>
        <div className="Center-block">
          <div className="Search-block">
            <TextField id="time" type="text" />
            <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
          </div>
        </div>
        <div className="My-kavers-block">
          <h1>My Kavers</h1>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Александра Негрескул
              </Typography>
            </CardContent>
          </Card>
        </div>
        <Fab className="Add-song-fab">
          <FontAwesomeIcon icon={faPlus} size="3x" className="Add-song-icon" />
        </Fab>
        <Drawer anchor={'right'} open={isDrawerOpen} onClose={() => isDrawerOpen = false}>
          <h1>Title</h1>
        </Drawer>
      </div>
    </div>
  );
}

export default App;
