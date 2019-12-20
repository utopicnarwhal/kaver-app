import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import createClient from "./services/apolloClient";
import { kaverThemeLight } from "../content/theme";
import HomePage from "./pages/Home-page/Home-page";
import { MuiThemeProvider } from "@material-ui/core";

const client = createClient();

export default class App extends React.Component {
  private currentTheme = kaverThemeLight;

  public render() {
    return (<ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <MuiThemeProvider theme={this.currentTheme}>
          <div className="App" style={{ backgroundColor: this.currentTheme.palette.background.default }}>
            <HomePage></HomePage>
          </div>
        </MuiThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>);
  }
}
