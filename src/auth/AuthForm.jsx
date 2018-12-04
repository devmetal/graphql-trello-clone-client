import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

class AuthForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSignUp: PropTypes.bool.isRequired,
  };

  state = {
    email: '',
    password: '',
    confirm: '',
    errors: {},
  };

  validationError = (field, message) =>
    this.setState(({ errors }) => ({
      errors: {
        ...errors,
        [field]: message,
      },
    }));

  handleSubmit = e => {
    e.preventDefault();

    let hasError = false;
    const { email, password } = this.state;
    const { onSubmit, isSignUp } = this.props;

    if (!isEmail(email)) {
      this.validationError('email', 'Invalid email address');
      hasError = true;
    }

    if (!isLength(password, { min: 3 })) {
      this.validationError('password', 'Password minimum length is 3');
      hasError = true;
    }

    if (isSignUp) {
      const { confirm } = this.state;

      if (confirm !== password) {
        this.validationError('confirm', 'Passwords does not match');
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    return onSubmit({ email, password });
  };

  handleChangeEmail = e => this.setState({ email: e.target.value });
  handleChangePass = e => this.setState({ password: e.target.value });
  handleChangeConfirm = e => this.setState({ confirm: e.target.value });

  render() {
    const { disabled, isSignUp } = this.props;
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            placeholder="email address..."
            formNoValidate
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePass}
            placeholder="password..."
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        {isSignUp ? (
          <div>
            <input
              type="password"
              value={this.state.confirm}
              onChange={this.handleChangeConfirm}
              placeholder="confirm password..."
            />
            {errors.confirm && <div>{errors.confirm}</div>}
          </div>
        ) : null}
        <button type="submit" disabled={disabled}>
          {this.props.isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
    );
  }
}

export default AuthForm;
