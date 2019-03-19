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
    // const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
			// renewSession();
			this.props.history.replace('/app');
			return;
		}
		window.gapi.signin2.render('g-signin2', {
			'scope': 'https://www.googleapis.com/auth/plus.login',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': this.onSignIn.bind(this)
		});
	}

	onSignIn(user) {
		const userId = user.getBasicProfile().getId();
		localStorage.setItem('profile', `google-oauth2|${userId}`);
		localStorage.setItem('isLoggedIn', 'true');
		this.props.history.replace('/app');
	}

  render() {
		return (
			<div id="g-signin2"></div>
		);
  }
}

export default Login;