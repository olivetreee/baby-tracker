import React, { Component } from 'react';

class Login extends Component {
	componentDidMount() {
		const { auth } = this.props;
		if (auth.isAuthenticated()) {
			this.props.history.replace('/app');
			return;
		}

		window.gapi.signin2.render('g-signin2', {
			'scope': 'https://www.googleapis.com/auth/plus.login',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': auth.onSingIn.bind(this)
		});
	}

	render() {
		return (
			<div id="g-signin2"></div>
		);
	}
}

export default Login;