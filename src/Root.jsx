import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { split, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import ThemeProvider from './Theme';
import App from './App';

const getJwtToken = () => window.localStorage.getItem('token');

const httpLink = new HttpLink();

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5432/graphql',
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: getJwtToken() || null,
    }),
  },
});

const authLink = (operation, forward) => {
  const token = getJwtToken() || null;

  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      Authorization: `bearer ${token}`,
    },
  }));

  return forward(operation);
};

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  from([authLink, httpLink]),
);

const client = new ApolloClient({
  link,
  connectToDevTools: true,
  cache: new InMemoryCache({
    dataIdFromObject: ({ id }) => id || null,
  }),
});

class Root extends Component {
  render() {
    return (
      <ThemeProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default Root;
