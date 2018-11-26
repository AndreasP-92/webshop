const bodyParser = require('body-parser');

module.exports = (server) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ 'extended': true }));
};
