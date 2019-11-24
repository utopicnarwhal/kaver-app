import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import logo from "../app/content/kaver-logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, Typography, Fab, Drawer } from "@material-ui/core";
import { HalfPageWave } from "./components/decor/Half-page-wave";
import Search from "./components/search/Search";
import createClient from "./services/apolloClient";
import { ThemeProvider } from "@material-ui/styles";
import { kaverTheme } from "./Constants";

const client = createClient();

export default class App extends React.Component<{}, { isDrawerOpen: boolean }> {
  public state = { isDrawerOpen: false };

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (<ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ThemeProvider theme={kaverTheme}>
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
              <HalfPageWave amplitude={3} waveCount={10} color="#27AE60"></HalfPageWave>

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
              <Fab className="Add-song-fab" onClick={() => this.setState({ isDrawerOpen: true })} color={"primary"}>
                <FontAwesomeIcon icon={faPlus} size="3x" className="Add-song-icon" />
              </Fab>
              <Drawer anchor={"right"} open={this.state.isDrawerOpen} onClose={() => this.setState({ isDrawerOpen: false })}>
                <h1>Title</h1>
              </Drawer>
            </div>
          </div>
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>);
  }
}
