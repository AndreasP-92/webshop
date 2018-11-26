const passport = require('passport');
const LocalStrategy = require('./LocalStrategy')();
const GoogleStrategy = require('./GoogleStrategy')();

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
	done(null, { 'id': id });
});

passport.use('local', LocalStrategy);
passport.use('google', GoogleStrategy);

module.exports = passport;
