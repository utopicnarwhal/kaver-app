import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message}`
    );
  }
});

export default class ApiClient {
  public static getInstance(): ApolloClient<NormalizedCacheObject> {
    if (!this.instance) {
      this.instance = this.createClient();
    }
    return this.instance;
  }

  public static createClient(): ApolloClient<NormalizedCacheObject> {
    const cache = new InMemoryCache();

    const httpLink = new HttpLink({
      uri: process.env.REACT_APP_API_URL,
      fetchOptions: {
        credentials: process.env.NODE_ENV === "development" ? "same-origin" : "include",
      },
    });

    const client = new ApolloClient<NormalizedCacheObject>({
      cache,
      link: ApolloLink.from([errorLink, httpLink])
    });

    return client;
  }

  private static instance: ApolloClient<NormalizedCacheObject>;
}
