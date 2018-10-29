import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import RestrictedRoute from './auth/RestrictedRoute';
import AuthScreen from './auth/AuthScreen';
import query from './auth/query/user';
import { SignedUser, useSignedUser } from './auth/useSignedUser';

function Temp() {
  const user = useSignedUser();

  return (
    <div>
      <h1>Temp Dashboard</h1>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      setUser: this.setUser,
    };
  }

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const { client } = this.props;
    client
      .query({
        query,
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        this.setState({
          user: data.currentUser,
          loading: false,
        });
      });
  }

  render() {
    const { user, setUser, loading } = this.state;

    if (loading === true) {
      return null;
    }

    return (
      <SignedUser.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Router>
          <Switch>
            <RestrictedRoute
              mustBe="signed"
              path="/boards"
              component={Temp}
              redirect={{
                pathname: '/login',
              }}
            />
            <RestrictedRoute
              mustBe="stranger"
              path="/login"
              component={AuthScreen}
              redirect={{
                pathname: '/boards',
              }}
            />
            <Route component={() => <Redirect to="/boards" />} />
          </Switch>
        </Router>
      </SignedUser.Provider>
    );
  }
}

export default withApollo(App);
