import { hoursToMs } from './utils';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const baseUrl = 'https://uwpyc3upak.execute-api.us-west-2.amazonaws.com/v1';

export const fetchData = (
		category,
		fromTimestamp = Date.now() - hoursToMs(24)
	) => {
	let currentUser;
	try {
		currentUser = localStorage.getItem('profile');
	} catch (err) {
		throw new Error('Error getting currentUser. Aborting fetch.');
	}
	return fetch(
	`${baseUrl}?category=${category}&fromTimestamp=${fromTimestamp}`,
	{
		method: 'GET',
		headers: {
			'x-amzcpt-current-user': currentUser
		}
	})
}

export const secureFetch = (category, fromTimestamp) => {
	if (!auth.isAuthenticated()) {
		history.replace('/login');
		return Promise.resolve();
	}
	return fetchData(category, fromTimestamp);
}

export default secureFetch;