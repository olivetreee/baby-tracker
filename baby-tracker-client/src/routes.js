import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './Auth/Login';
import App from './App';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

export const makeMainRoutes = () => {
	return (
			<Router history={history}>
				<div>
					<Route path="/" exact render={(props) => <Login auth={auth} {...props} />} />
					<Route path="/app" render={(props) => <App auth={auth} {...props} />} />
				</div>
			</Router>
	);
}