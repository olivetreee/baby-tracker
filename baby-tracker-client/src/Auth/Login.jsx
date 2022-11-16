import React, { Component } from 'react';

import './Login.css';

class Login extends Component {
	componentDidMount() {
		const { auth } = this.props;
		console.log('@@@auth.isAuthenticated', auth.isAuthenticated());
		if (auth.isAuthenticated()) {
			this.props.history.replace('/app');
			return;
		}

		window.google.accounts.id.initialize({
			client_id: "1040367907541-0o6a7b5isda4f8mmbvqle9ad7mj654mf.apps.googleusercontent.com",
			callback: (data) => auth.onSignIn(data)
		});
		window.google.accounts.id.prompt();
	}

	render() {
		const { auth } = this.props;
		const onSuccess = bla => console.log('@@@bla', bla);

		return (
			<div className="login">
				{/* <div id="g_id_onload"
						data-client_id="1040367907541-0o6a7b5isda4f8mmbvqle9ad7mj654mf.apps.googleusercontent.com"
						data-context="signin"
						data-callback={onSuccess}
						data-itp_support="true">
				</div> */}
				{/* <div id="g_id_onload"
					data-client_id="1040367907541-0o6a7b5isda4f8mmbvqle9ad7mj654mf.apps.googleusercontent.com"
					data-context="signin"
					data-ux_mode="popup"
					data-callback={ (bla) => {console.log("@@@bla", bla)} }
					data-nonce=""
					data-auto_prompt="false">
				</div>

				<div className="g_id_signin"
					data-type="standard"
					data-shape="pill"
					data-theme="outline"
					data-text="signin_with"
					data-size="large"
					data-logo_alignment="left">
				</div> */}
			</div>
		);
	}
}

export default Login;