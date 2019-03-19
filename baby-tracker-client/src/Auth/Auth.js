import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG, AUTH_DEV_CONFIG } from './auth0-variables';

let authInstance;

export default class Auth {
	accessToken;
	idToken;
	expiresAt;

	constructor() {
		if (authInstance) {
			return authInstance;
		}

		const authToUse = window.location.hostname === 'localhost'
		? AUTH_DEV_CONFIG
		: AUTH_CONFIG

		this.auth0 = new auth0.WebAuth({
			domain: authToUse.domain,
			clientID: authToUse.clientId,
			redirectUri: authToUse.callbackUrl,
			responseType: 'token id_token',
			scope: 'openid'
		});

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.getAccessToken = this.getAccessToken.bind(this);
		this.getIdToken = this.getIdToken.bind(this);
		this.renewSession = this.renewSession.bind(this);

		authInstance = this;
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					return resolve();
				} else if (err) {
					history.replace('/app');
					console.error(err);
					alert(`Error: ${err.error}. Check the console for further details.`);
					return reject(err);
				}
				return reject();
			});
		})
	}

	getAccessToken() {
		return this.accessToken;
	}

	getIdToken() {
		return this.idToken;
	}

	setSession(authResult) {
		// Set isLoggedIn flag in localStorage
		localStorage.setItem('isLoggedIn', 'true');
		const profileSub = authResult.idTokenPayload.sub;
		// Set profile sub in localStorage
		localStorage.setItem('profile', profileSub);

		// Set the time that the access token will expire at
		let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
		this.accessToken = authResult.accessToken;
		this.idToken = authResult.idToken;
		this.expiresAt = expiresAt;

		// navigate to the home route
		history.replace('/app');
	}

	renewSession() {
		this.auth0.checkSession({}, (err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				this.logout();
				console.log(err);
				alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
			}
		});
	}

	logout() {
		// Remove tokens and expiry time
		this.accessToken = null;
		this.idToken = null;
		this.expiresAt = 0;

		// Remove isLoggedIn flag from localStorage
		localStorage.removeItem('isLoggedIn');

		// navigate to the home route
		history.replace('/app');
	}

	isAuthenticated() {
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = this.expiresAt;
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		// return isLoggedIn && new Date().getTime() < expiresAt;
		return isLoggedIn;
	}
}