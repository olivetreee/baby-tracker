import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './Auth/Login';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication()
			.catch(err => {
				if (!auth.isAuthenticated()) {
					console.error('Auth error:', err);
					// auth.login();
				}
			});
	}
}

export const makeMainRoutes = () => {
	return (
			<Router history={history}>
				<div>
					<Route path="/" exact render={(props) => <Login auth={auth} {...props} />} />
					<Route path="/app" render={(props) => <App auth={auth} {...props} />} />
					<Route path="/callback" render={(props) => {
						handleAuthentication(props);
						return <Callback {...props} />
					}}/>
				</div>
			</Router>
	);
}