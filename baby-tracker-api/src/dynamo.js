const AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const TableName = 'baby-logs';


const ddbQuery = (category, fromTimestamp, toTimestamp) => new Promise((resolve, reject) => {
	var params = {
		TableName,
		ExpressionAttributeNames: {
			"#timestamp": 'timestamp'
		},
		ExpressionAttributeValues: {
			':category': category,
			':fromTimestamp': fromTimestamp,
			':toTimestamp': toTimestamp
		},
		KeyConditionExpression: 'category = :category and #timestamp BETWEEN :fromTimestamp AND :toTimestamp'
	};
	dynamodb.query(params, (err, data) => {
		if (err) {
			console.log('Error querying Dynamo:', err);
			reject(err);
			return;
		}
		resolve(data);
	});
});

const ddbPut = Item => new Promise((resolve, reject) => {
	dynamodb.put({ TableName, Item }, (err, data) => {
		if (err) {
			console.log('Error putting item into Dynamo:', err);
			reject(err);
			return;
		}
		resolve(data);
	});
});

const ddbDelete = item => new Promise((resolve, reject) => {
	dynamodb.delete({ TableName, Key: item }, (err, data) => {
		if (err) {
			console.log('Error deleting from Dynamo:', err);
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
	ddbQuery,
	ddbUpdateLatest,
	ddbPut,
	ddbDelete
}
