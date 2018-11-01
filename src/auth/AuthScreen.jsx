import React, { Component } from 'react';
import decode from 'jwt-decode';

import { Fail } from '../alert/Alert';
import Auth from './Auth';
import { UserContext } from './userContext';

class AuthScreen extends Component {
  state = { error: '', isSignUp: false };

  renderErrors = () => {
    if (this.state.error.length > 0) {
      return <Fail text={this.state.error} />;
    }
    return null;
  };

  toggleToSignUp = () => this.setState({ isSignUp: true });
  toggleToSignIn = () => this.setState({ isSignUp: false });

  onError = error => this.setState({ error });

  render() {
    return (
      <UserContext.Consumer>
        {({ setUser }) => (
          <div>
            {this.renderErrors()}
            <Auth
              isSignUp={this.state.isSignUp}
              onClickSignIn={this.toggleToSignIn}
              onClickSignUp={this.toggleToSignUp}
              onSuccess={token => {
                window.localStorage.setItem('token', token);
                setUser(decode(token));
              }}
              onError={this.onError}
            />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default AuthScreen;
