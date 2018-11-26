const authenticate 	= require('../../../middleware/authenticate');
const getAllWhere	= require('../../services/getAllWHere');
const update		= require('../../services/update');


module.exports = function (server) {
	server.get('/profile', authenticate, async (req, res) => {
		let username = req.session.username;

		const getUserInfo = await getAllWhere.profile(username); 

		try {
			res.render('pages/index/profile/dashboard',{
				'page' 		: 	'yourProfile',
				'user'		:	getUserInfo[0],
				'username'	:	username
			});
			
		} catch (error) {
			console.log(error)
		}
	});
// ********************************************************************** POST **********************************************************

// CHANGE PROFILE INFO ==========
	server.post('/JSON/post/profileinfo', authenticate, async (req, res) => {
		// let username	= 'admin';
		let username 	= req.session.username
		let firstname	= req.body.name;
		let lastname	= req.body.lastname;
		let email		= req.body.email;

		try {
			await update.profileInfo(username, firstname, lastname, email)
			res.redirect('/profile')
			
		} catch (error) {
			console.log(error) 
		}
	});

// CHANGE PASSWORD ============
	server.post('/JSON/post/profilepassword', authenticate, async (req, res) => {
		let username 	= req.session.username
		let password	= req.body.password;

		try {
			await update.profilePassword(username, password)
			res.redirect('/profile')
			
		} catch (error) {
			console.log(error) 
		}
	});
};