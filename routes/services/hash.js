const bcrypt = require('bcrypt');

const Hash = function (passphrase) {
	const saltRounds = 10;
	return new Promise((resolve, reject) => {
		bcrypt.hash(passphrase, saltRounds, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

Hash.compare = function (passphrase, hash) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(passphrase, hash, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
};

module.exports = Hash;
