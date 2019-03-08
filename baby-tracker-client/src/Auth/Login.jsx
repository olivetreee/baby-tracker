import React, { Component } from 'react';

class Login extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
			renewSession();
			return;
		}
		this.login.call(this);
  }

  render() {
		return (
			<div></div>
		);
  }
}

export default Login;