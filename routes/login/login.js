const User 						= require('../services/users');
const passport 					= require('../../middleware/passport');
const {validationErrors}		= require('express-validator');
const getOne					= require('../services/getOne');


module.exports = function (server) {
	server.get('/login', (req, res) => {
		let username	= 	req.session.username;

		res.render('pages/login/login',{
			'username'	:	username
		});
	});

	server.get('/login/find/:user',async function(req,res){
		let User = req.params.user
		try{
			const user = await getOne.user(User);
			res.send(user)
		}catch(e){
			console.log(e)
		}

	})

	server.post('/login', passport.authenticate('local', {
		'successRedirect': '/profile',
		'failureRedirect': '/login',
		'failureFlash': true
	}));

	server.get('/logout', (req, res) => {
		req.session.destroy((err) => {
			res.redirect('/');
		});
	});
};
