import React, { Component } from 'react';

class AuthForm extends Component {
  state = { email: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onLogin({ ...this.state });
  };

  handleChangeEmail = e =>
    this.setState({ email: e.target.value });

  handleChangePass = e =>
    this.setState({ password: e.target.value });

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            placeholder="email address..."
          />
        </div>
        <div>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePass}
            placeholder="password..."
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    );
  };
}

export default AuthForm;
