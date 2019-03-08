import React, { Component } from 'react';
// import './App.css';

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
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
				<button
					bsStyle="primary"
					className="btn-margin"
					onClick={this.goTo.bind(this, 'app')}
				>
					Home
				</button>
				{
					!isAuthenticated() && (
							<button
								id="qsLoginBtn"
								bsStyle="primary"
								className="btn-margin"
								onClick={this.login.bind(this)}
							>
								Log In
							</button>
						)
				}
				{
					isAuthenticated() && (
							<button
								id="qsLogoutBtn"
								bsStyle="primary"
								className="btn-margin"
								onClick={this.logout.bind(this)}
							>
								Log Out
							</button>
						)
				}
      </div>
    );
  }
}

export default Login;