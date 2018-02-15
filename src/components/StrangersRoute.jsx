import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../query/user';

class StrangersRoute extends Component {
  render() {
    const { component: Component, redirect, data, ...rest } = this.props;
    const { currentUser, loading } = data;

    if (loading) {
      return null;
    }

    const signed = currentUser !== null && !!currentUser.email;

    return (
      <Route {...rest} render={props => (
        signed === false ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              ...redirect,
              state: { from: props.location }
            }} />
          )
      )} />)
  }
}

export default graphql(query, {
  options: {
    fetchPolicy: 'network-only',
  },
})(StrangersRoute);
