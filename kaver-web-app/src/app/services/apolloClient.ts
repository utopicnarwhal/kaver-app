import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import produce from "immer";

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

const createClient = () => {
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: `localhost:4000/graphql`
  });

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([errorLink, httpLink])
  });

  return client;
};

export default createClient;
