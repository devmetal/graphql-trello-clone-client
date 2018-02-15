import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import AuthForm from './AuthForm';
import login from '../mutation/login';

class Auth extends Component {
  state = { error: '', success: false };

  handleLogin = ({ email, password }) =>
    this.props.mutate({
      variables: { email, password },
    })
      .then(({ data }) => {
        window.localStorage.setItem('token', data.login);
        this.setState({ success: true });
      })
      .catch((e) => {
        this.setState({ error: e.message });
      })

  render() {
    return (
      <div>
        { !!this.state.error.length && <div>{this.state.error}</div> }
        { this.state.success && <Redirect to="/boards" /> }
        <AuthForm onLogin={this.handleLogin} />
      </div>
    )
  }
}

export default graphql(login)(Auth);
