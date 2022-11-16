import React, { Component } from 'react';

import './Login.css';

class Login extends Component {
	componentDidMount() {
		const { auth } = this.props;
		if (auth.isAuthenticated()) {
			this.props.history.replace('/app');
			return;
		}
		this.initGoogleAuth();
	}

	initGoogleAuth() {
		const { auth } = this.props;
		setTimeout(() => {
			if (window.google && window.google.accounts) {
				window.google.accounts.id.initialize({
					client_id: "1040367907541-0o6a7b5isda4f8mmbvqle9ad7mj654mf.apps.googleusercontent.com",
					callback: (data) => auth.onSignIn(data)
				});
				window.google.accounts.id.prompt();
				return;
			}
			console.log("Google auth script not ready yet. Trying again in a bit...");
			this.initGoogleAuth();
		}, 250)
	}

	render() {
		return (
			<div className="login" />
		);
	}
}

export default Login;