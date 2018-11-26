const KEY ="898757410913-71vupmo6fdinapgo8693r0k1e26cjtuo.apps.googleusercontent.com";
const SECRET = "JIkrWF-gxTPoOtuvtttR4Kp2";
const User = require('../routes/services/users');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const insert	= require('../routes/services/insert');

module.exports = function () {
	return new GoogleStrategy({
		'clientID': KEY,
		'clientSecret': SECRET,
		'callbackURL': "http://localhost:1338/google/callback"
	},
	async function(accessToken, refreshToken, profile, done) {
		try {
			firstname	= profile.name.givenName
			lastname	= profile.name.familyName
			email		= profile.emails[0].value
			img			= profile._json.image.url
			const user 				= await User.google.findOrCreate(profile.id, email, firstname, lastname, img);
			// console.log('user =====',user)
			// const insertProfile		= await insert.profile(email, firstname, lastname, img)
			done(null, { 'id': user });
		} catch (error) {
			done(error);
		}
	});
};