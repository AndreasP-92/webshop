const LocalStrategy 	= require('passport-local').Strategy;
const User 				= require('../routes/services/users');
const getAllWhere		= require('../routes/services/getAllWhere');

module.exports = function () {
	return new LocalStrategy({
		'usernameField': 'username',
		'passwordField': 'passphrase',
		'passReqToCallback': true
	}, async function (req, username, passphrase, done) {
		try {
			const checkUser		= await getAllWhere.profile(username);
			const valid 		= await User.valid(username, passphrase);

			if (!valid)
			return res.redirect('/login');

			req.session.isLoggedIn 		= { 'id': valid };
			req.session.username		= username;			

			return done (null, req.session.isLoggedIn);
		} catch (error) {
			return done(error);
		}
	});
};
