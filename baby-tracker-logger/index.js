const DynamoUtils = require('./src/dynamo');

const categories = {
	feed: 'feed',
	poop: 'poop',
	pee: 'pee'
};

const clickToCategory = {
	'SINGLE': categories.pee,
	'DOUBLE': categories.poop,
	'LONG': categories.feed
}

exports.handler = async (event, context, callback) => {
	const timestamp = new Date().getTime();
	const { clickType } = event;
	const category = clickToCategory[clickType];
	const Item = {
		category,
		timestamp,
		latest: 'true'
	}

	try {
		console.log('Starting DDB Query...');
		const queriedData = await DynamoUtils.ddbQueryLatest(category);
		const curretLatest = queriedData.Items[0];
		console.log('Finished Query. Starting Update...');
		await DynamoUtils.ddbUpdateLatest(curretLatest);
		console.log('Finished Update. Starting Put...');
		await DynamoUtils.ddbPut(Item);
	} catch (err) {
		console.error('Error when saving data to Dynamo', err);
		return err;
	}

	console.log('Finished all operations');
	return {
		statusCode: 200
	};
};
