const { categories } = require('../constants');
const DynamoUtils = require('../dynamo');

const clickToCategory = {
	'SINGLE': categories.pee,
	'DOUBLE': categories.poop,
	'LONG': categories.feed
}

const buttonHandler = async event => {
	const timestamp = new Date().getTime();
	const category = clickToCategory[event.clickType];
	const Item = {
		category,
		timestamp
	}

	try {
		console.log('Starting DDB Put...');
		await DynamoUtils.ddbPut(Item);
	} catch (err) {
		console.error('Error while interacting with Dynamo', err);
		return {
			statusCode: 500,
			err
		};
	}

	console.log('Finished all operations');
	return {
		statusCode: 200
	};
}

module.exports = buttonHandler;