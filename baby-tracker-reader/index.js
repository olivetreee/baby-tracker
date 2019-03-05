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
		const querystring = event.params.querystring;
		const { category } = querystring;
		const fromTimestamp = parseInt(querystring.fromTimestamp);
		const toTimestamp = Date.now();
		console.log('Starting DDB Query...');
		const queriedData = await DynamoUtils.ddbQuery(category, fromTimestamp, toTimestamp);
		items = queriedData.Items;
		console.log('Finished DDB Query');
	} catch (err) {
		console.error('Error while querying Dynamo', err);
		return {
			statusCode: 500,
			event,
			err
		};
	}

	return {
		statusCode: 200,
		items
	};
};
