import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Fail } from '../portal/Alert';
import AuthForm from './AuthForm';
import LOGIN from '../mutation/login';

const AuthBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthFormFlex = styled(AuthForm)`
  display: box;
  width: 25%;
  padding: 0.15em;
  background-color: ${props => props.theme.colors.fg2};
  border-radius: ${props => props.theme.border.radius};
  margin-bottom: 10%;
`;

class Auth extends Component {
  state = { error: '', success: false, loading: false };

  renderErrors = () => {
    if (this.state.error.length > 0) {
      return <Fail text={this.state.error} />;
    }
    return null;
  }

  renderRedirect = () => {
    if (this.state.success) {
      return <Redirect to="/boards" />
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <AuthBox>
          { this.renderErrors()  }
          { this.renderRedirect()  }
          <Mutation mutation={LOGIN}>
            {login => (
              <AuthFormFlex
                onLogin={({ email, password }) => {
                  this.setState({ loading: true, error: '' });
                  login({ variables: { email, password } })
                    .then(({ data }) => {
                      window.localStorage.setItem('token', data.login);
                      this.setState({ success: true, loading: false });
                    })
                    .catch((e) => {
                      this.setState({ error: e.message, loading: false });
                    });
                }}
              />
            )}
          </Mutation>
        </AuthBox>
      </React.Fragment>
    )
  }
}

export default Auth;
