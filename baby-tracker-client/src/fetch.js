import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const baseUrl = 'https://uwpyc3upak.execute-api.us-west-2.amazonaws.com/v1';

export const fetchData = ({
	querystring = '',
	method = 'GET',
	body = {}
}) => {
	let currentUser;
	try {
		currentUser = localStorage.getItem('profile');
	} catch (err) {
		throw new Error('Error getting currentUser. Aborting fetch.');
	}
	return fetch(
	`${baseUrl}?${querystring}`,
	{
		method: method.toUpperCase(),
		headers: {
			'x-amzcpt-current-user': currentUser
		},
		body: JSON.stringify(body)
	})
}

export const secureFetch = ({ querystring, method, body }) => {
	if (!auth.isAuthenticated()) {
		history.replace('/');
		return Promise.resolve();
	}
	return fetchData({ querystring, method, body });
}

export default secureFetch;