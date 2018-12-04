import React, { Component } from 'react';

import { Fail } from '../alert/Alert';
import SignIn from './SignIn';
import SignUp from './SignUp';
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
    const { isSignUp } = this.state;

    return (
      <UserContext.Consumer>
        {({ setUser }) => (
          <div>
            {this.renderErrors()}
            {isSignUp ? (
              <SignUp
                onSuccess={this.setUser}
                onError={this.onError}
                onClickSignIn={this.toggleToSignIn}
              />
            ) : (
              <SignIn
                onSuccess={this.setUser}
                onError={this.onError}
                onClickSignUp={this.toggleToSignUp}
              />
            )}
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default AuthScreen;
