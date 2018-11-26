const passport = require('../../middleware/passport');

module.exports = function (server) {

	server.get('/google/login',
		passport.authenticate('google', { scope: ['profile', 'email'] }));

	server.get('/google/callback', 
		passport.authenticate('google', { failureRedirect: '/login' }),
		function(req, res) {
			req.session.isLoggedIn = { 'id': 'smellyhobo' }
			res.redirect('/profile');
		});
};
