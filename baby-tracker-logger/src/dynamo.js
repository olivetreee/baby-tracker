const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-1'});

const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const TableName = 'baby-logs';


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

const ddbUpdateLatest = (orgItem) => new Promise((resolve, reject) => {
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

module.exports = {
	ddbQueryLatest,
	ddbUpdate,
	ddbPut
}