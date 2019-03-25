const DynamoUtils = require('./src/dynamo');
const buttonHandler = require('./src/handlers/buttonHandler');
const methodHandler = require('./src/handlers/methodHandler');

exports.handler = async (event, context, callback) => {
	let response;
	console.log('Incoming event:', event);

	try {
		if (event.clickType) {
			console.log('Handling button event');
			response = await buttonHandler(event);
		} else {
			console.log('Handling method event');
			response = await methodHandler(event);
		}
	} catch (err) {
		response = err
	}

	console.log('Done with handler. Returning response:', response);

	return response;
};
