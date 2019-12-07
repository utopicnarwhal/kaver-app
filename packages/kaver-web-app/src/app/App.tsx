import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import logo from "../app/content/images/kaver-logo.svg";
import "./App.css";
import { Card, CardContent, Typography, MuiThemeProvider } from "@material-ui/core";
import { HalfPageWave } from "./components/decor/Half-page-wave";
import Search from "./components/search/Search";
import createClient from "./services/apolloClient";
import { kaverThemeLight } from "./content/theme";
import AddKaverFAB from "./components/add_kaver_fab/Add-kaver-fab";
import { kAppName } from "./Constants";
import LoginButton from "./components/login-button/Login-button";

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
                <span className="App-logo-text">{kAppName}</span>
              </div>
              <LoginButton></LoginButton>
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
