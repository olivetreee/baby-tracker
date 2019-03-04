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

exports.handler = async (event, context, callback) => {
	const timestamp = new Date().getTime();
	const { clickType } = event;
	const category = clickToCategory[clickType];
	const Item = {
		category,
		timestamp
	}

	const ddbPut = () => new Promise((resolve, reject) => {
		dynamodb.put({ TableName, Item }, (err, data) => {
			console.log('@@@inside DDB');
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});

	try {
		console.log('@@@Gonna go to DDB now');
		await ddbPut();
	} catch (err) {
		console.error('Error when saving data to Dynamo', err);
		return err;
	}

	console.log('@@@abt to return');
	return {
		statusCode: 200
	};
};
