import React from 'react';
import logo from '../kaver-logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignInAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TextField, Card, CardContent, Typography, Fab, Drawer } from '@material-ui/core';

var isDrawerOpen = true;
const diff = 3;
const wavesCount = 10;

const App: React.FC = () => {
  let generatedWaveSvgPath = "";
  for (let i = 0; i < wavesCount; ++i) {
    let y = 50 - diff;
    let dx = 100 / wavesCount;
    generatedWaveSvgPath += `Q ${((dx * i) + (dx / 4)).toString()} ${y}, ${((dx * i) + (dx / 2)).toString()} 50 
      T ${((dx * i) + dx).toString()} 50 `;
  }
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
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="Background-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" >
          <g>
            <path d={
              `M 0 0
            L 0 50
            ${generatedWaveSvgPath}
            L 100 50, 100 0
            Z`
            } fill="#27AE60" />
          </g>
          {/* <defs>
            <filter id="filter0_d" x="-4" y="-4" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs> */}
        </svg>

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
        {/* <Drawer anchor={'right'} open={isDrawerOpen} onClose={() => isDrawerOpen = false}>
          <h1>Title</h1>
        </Drawer> */}
      </div>
    </div>
  );
}

export default App;
