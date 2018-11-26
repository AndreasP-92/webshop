const db = require('../../config/database').connect();
const debug = require('debug')('app:keys');


const key = function () {};

key.get = function (name) {
	return new Promise((resolve, reject) => db.execute("SELECT `key` FROM `keys` WHERE name = ?",
	[name], (err, row) => {
		if (err) reject(err);
		resolve(row[0]);
	}));
};

module.exports = key;
