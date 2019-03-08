export const hoursToMs = hours => hours * 60 * 60 * 1000;

export const printHoursAndMinutesFromDiff = minutes => {
	if (minutes < 60) {
		return `${minutes} m`;
	}
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60
	return `${hours}:${remainingMinutes} h`;
}

export const printHoursAndMinutesFromDate = timestamp => {
	const date = new Date(timestamp);
	const hours = date.getHours() < 10
		? `0${date.getHours()}`
		: date.getHours();
	const minutes = date.getMinutes() < 10
		? `0${date.getMinutes()}`
		: date.getMinutes();
	return `${hours}:${minutes}`;
}

export const categories = {
	feed: 'feed',
	poop: 'poop',
	pee: 'pee'
};

