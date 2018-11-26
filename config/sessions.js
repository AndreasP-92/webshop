const session = require('express-session');
const key = require('../services/keys');
const debug = require('debug')('app:sessions');

/**
 * @module Sessions
 * @param {Object} app 
 */
module.exports = async function (app) {
	/* try {
		debug('using session key from database');
		app.use(session({
			'resave': false,
			'saveUninitialized': true,
			'secret': await key.get('session')
		}));
	} catch (error) {
		debug(error);
		debug('using default session key'); */
		app.use(session({
			'resave': false,
			'saveUninitialized': true,
			'secret': 'default secret'
		}));
	// }
};