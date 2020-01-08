import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { kaverThemeLight } from "../content/theme";
import HomePage from "./pages/Home-page/Home-page";
import { MuiThemeProvider } from "@material-ui/core";
import ApiClient from "./services/api_client";

export default class App extends React.Component {
  private currentTheme = kaverThemeLight;
  private store = configureStore();
  private apiClient = ApiClient.getInstance();

  public render() {
    return (
      <ApolloProvider client={this.apiClient}>
        <ApolloHooksProvider client={this.apiClient}>
          <Provider store={this.store}>
            <MuiThemeProvider theme={this.currentTheme}>
              <div className="App" style={{ backgroundColor: this.currentTheme.palette.background.default }}>
                <HomePage></HomePage>
              </div>
            </MuiThemeProvider>
          </Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}
