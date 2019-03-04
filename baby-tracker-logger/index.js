const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-1'});

// Create DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const TableName = 'baby-logs';

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

const feedEveryHours = 3;

const ddbQueryLatest = (category) => new Promise((resolve, reject) => {
	var params = {
		TableName,
		IndexName: 'category-latest-index',
		ExpressionAttributeValues: {
			':category': category,
			':latest': 'true'
		},
		KeyConditionExpression: 'category = :category and latest = :latest'
	};
	dynamodb.query(params, (err, data) => {
		if (err) {
			reject(err);
			return;
		}
		resolve(data);
	});
});

const ddbPut = Item => new Promise((resolve, reject) => {
	dynamodb.put({ TableName, Item }, (err, data) => {
		if (err) {
			reject(err);
			return;
		}
		resolve(data);
	});
});

const ddbUpdate = (orgItem) => new Promise((resolve, reject) => {
	const params= {
		TableName,
		Key: { category: orgItem.category, timestamp: orgItem.timestamp },
		ExpressionAttributeNames: {'#latest' : 'latest'},
		ExpressionAttributeValues: {
			':latestStatus' : 'false'
		},
		UpdateExpression: 'set #latest = :latestStatus'
	};
	dynamodb.update(params, (err, data) => {
		if (err) {
			reject(err);
			return;
		}
		resolve(data);
	});
});

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
		const queriedData = await ddbQueryLatest(category);
		const curretLatest = queriedData.Items[0];
		console.log('Finished Query. Starting Update...');
		await ddbUpdate(curretLatest);
		console.log('Finished Update. Starting Put...');
		await ddbPut(Item);
	} catch (err) {
		console.error('Error when saving data to Dynamo', err);
		return err;
	}

	console.log('Finished all operations');
	return {
		statusCode: 200
	};
};
