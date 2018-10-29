import React, { Component } from 'react';
import styled from 'styled-components';
import decode from 'jwt-decode';

import { Fail } from '../alert/Alert';
import Auth from './Auth';
import { SignedUser } from './useSignedUser';

const AuthBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
      <SignedUser.Consumer>
        {({ setUser }) => (
          <AuthBox>
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
          </AuthBox>
        )}
      </SignedUser.Consumer>
    );
  }
}

export default AuthScreen;
