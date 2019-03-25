const DynamoUtils = require('../dynamo');
const { makeStandardResponse } = require('../utils');

const methods = {
	'GET': async event => {
		const querystring = event.queryStringParameters;
		const { category } = querystring;
		const fromTimestamp = parseInt(querystring.fromTimestamp);
		const toTimestamp = Date.now();
		console.log('Starting DDB Query...');
		const queriedData = await DynamoUtils.ddbQuery(category, fromTimestamp, toTimestamp);
		items = queriedData.Items;
		console.log('Finished DDB Query');
		return items;
	},
	'POST': async event => {
		const body = JSON.parse(event.body);
		const { category, timestamp } = body;
		const Item = {
			category,
			timestamp
		};
		console.log('Starting DDB Put...');
		await DynamoUtils.ddbPut(Item);
		console.log('Finished DDB Put');
		return;
	},
	'DELETE': async event => {
		const body = JSON.parse(event.body);
		console.log('Starting DDB Delete...');
		await DynamoUtils.ddbDelete(body);
		console.log('Finished DDB Delete');
		return;
	}
}

const methodHandler = async event => {
	const method = event.httpMethod;
	let response;
	try {
		const data = await methods[method](event) || {};
		response = makeStandardResponse(200, data);
	} catch (err) {
		response = makeStandardResponse(500, err);
	}
	return response;
}

module.exports = methodHandler;