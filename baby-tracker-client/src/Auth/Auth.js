import history from '../history';

export default class Auth {
	expiresIn = 24 * 60 * 60;

	constructor() {
		this.onSingIn = this.onSingIn.bind(this);
		this.logout = this.logout.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	onSingIn(user) {
		const userId = user.getBasicProfile().getId();

		// Set profile sub in localStorage
		localStorage.setItem('profile', `google-oauth2|${userId}`);
		// Set isLoggedIn flag in localStorage
		localStorage.setItem('isLoggedIn', 'true');

		// Set the time that the access token will expire at
		const expiresAt = (this.expiresIn * 1000) + new Date().getTime();
		localStorage.setItem('expiresAt', expiresAt);

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
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const expiresAt = localStorage.getItem('expiresAt');
		return isLoggedIn && new Date().getTime() < expiresAt;
	}
}