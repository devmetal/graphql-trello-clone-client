import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { split, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import StrangersRoute from './components/StrangersRoute';
import BoardsContainer from './BoardsContainer';
import Auth from './components/Auth';
import ThemeProvider from './Theme';

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

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <PrivateRoute
                path="/boards"
                component={BoardsContainer}
                redirect={{
                  pathname: '/login'
                }}
              />
              <StrangersRoute
                path="/login"
                component={() => <Auth subsClient={wsLink.subscriptionClient} />}
                redirect={{
                  pathname: '/boards'
                }}
              />
              <Route component={() => <Redirect to="/boards" />} />
            </Switch>
          </Router>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default App;
