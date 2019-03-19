import history from '../history';

export default class Auth {
	constructor() {
		this.setSession = this.setSession.bind(this);
		this.logout = this.logout.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
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