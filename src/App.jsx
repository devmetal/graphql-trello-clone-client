import React, { Component } from 'react';
import decode from 'jwt-decode';
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
import { UserContext, useUserContext } from './auth/userContext';

function Temp() {
  const user = useUserContext();

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

  setUser = jwt => {
    window.localStorage.setItem('token', jwt);
    const user = decode(jwt);
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
        const { currentUser } = data;
        this.setState({
          user: currentUser
            ? {
                id: currentUser.id,
                email: currentUser.email,
              }
            : null,
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
      <UserContext.Provider
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
      </UserContext.Provider>
    );
  }
}

export default withApollo(App);
