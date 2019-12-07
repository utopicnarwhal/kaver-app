import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import logo from "../app/content/kaver-logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, Typography, MuiThemeProvider } from "@material-ui/core";
import { HalfPageWave } from "./components/decor/Half-page-wave";
import Search from "./components/search/Search";
import createClient from "./services/apolloClient";
import { kaverThemeLight } from "./Constants";
import AddKaverFAB from "./components/add_kaver_fab/Add-kaver-fab";

const client = createClient();

export default class App extends React.Component {
  private currentTheme = kaverThemeLight;

  public render() {
    return (<ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <MuiThemeProvider theme={this.currentTheme}>
          <div className="App" style={{ backgroundColor: this.currentTheme.palette.background.default }}>
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
              <HalfPageWave amplitude={3} waveCount={10}></HalfPageWave>

              <div className="Favorites-block">
                <h1>Понравившееся:</h1>
              </div>
              <div className="Center-block">
                <Search></Search>
              </div>
              <div className="My-kavers-block">
                <h1>Мои каверы:</h1>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Александра Негрескул
                  </Typography>
                  </CardContent>
                </Card>
              </div>
              <AddKaverFAB></AddKaverFAB>
            </div>
          </div>
        </MuiThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>);
  }
}
