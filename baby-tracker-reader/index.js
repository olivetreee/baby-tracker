const DynamoUtils = require('./src/dynamo');

const TableName = 'baby-logs';

const categories = {
	feed: 'feed',
	poop: 'poop',
	pee: 'pee'
};

exports.handler = async (event, context, callback) => {
	let item;
	try {
		const category = event.params.querystring.category;
		console.log('Starting DDB Query...');
		const queriedData = await DynamoUtils.ddbQueryLatest(category);
		item = queriedData.Items[0];
		console.log('Finished DDB Query');
	} catch (err) {
		console.error('Error while querying Dynamo', err);
		return {
			statusCode: 500,
			event,
			context,
			err
		};
	}

	return {
		statusCode: 200,
		item
	};
};
