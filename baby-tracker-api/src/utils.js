const makeStandardResponse = (status, res) => ({
	statusCode: status,
	headers: {
		'access-control-allow-origin': '*'
	},
	body: JSON.stringify(res),
	isBase64Encoded: false
});

module.exports = {
	makeStandardResponse
}