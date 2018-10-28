import React, { Component } from 'react';
import styled from 'styled-components';

import Button from './Button';

const InputItem = styled.div`
  width: 100%;
  padding: 0.5em;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.3em;
  border-radius: ${props => props.theme.border.radius};
`;

class AuthForm extends Component {
  state = { email: '', password: '' };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onLogin({ ...this.state });
  };

  handleChangeEmail = e => this.setState({ email: e.target.value });

  handleChangePass = e => this.setState({ password: e.target.value });

  render() {
    const { className } = this.props;
    return (
      <form className={className} onSubmit={this.handleSubmit}>
        <InputItem>
          <Input
            type="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            placeholder="email address..."
          />
        </InputItem>
        <InputItem>
          <Input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePass}
            placeholder="password..."
          />
        </InputItem>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}

export default AuthForm;
