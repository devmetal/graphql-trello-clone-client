import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';

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
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSignUp: PropTypes.bool.isRequired,
  };

  state = {
    email: '',
    password: '',
    confirm: '',
    message: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (this.props.isSignUp === true) {
      const { confirm } = this.state;

      if (confirm !== password) {
        return this.setState({ message: 'Passwords does not match' });
      }

      return this.props.onSubmit({ email, password });
    }

    return this.props.onSubmit({ email, password });
  };

  handleChangeEmail = e => this.setState({ email: e.target.value });

  handleChangePass = e => this.setState({ password: e.target.value });

  handleChangeConfirm = e => this.setState({ confirm: e.target.value });

  render() {
    const { className, disabled } = this.props;
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
        {this.props.isSignUp === true ? (
          <Input
            type="password"
            value={this.state.confirm}
            onChange={this.handleChangeConfirm}
            placeholder="confirm password..."
          />
        ) : null}
        <Button type="submit" disabled={disabled}>
          {this.props.isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
      </form>
    );
  }
}

export default AuthForm;
