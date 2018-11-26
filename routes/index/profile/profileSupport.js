const authenticate 	= require('../../../middleware/authenticate');
const insert        = require('../../services/insert');
const getAllWhere	= require('../../services/getAllWHere');

module.exports = function (server) {
	server.get('/profile/support', authenticate, async (req, res) => {
		let username = req.session.username

		const getMessage = await getAllWhere.supportMessage(username)

		try {
			
			res.render('pages/index/profile/dashboard',{
				'page' 		:	'support',
				'message'	:	getMessage,
				'username'	:	username
			});
		} catch (err) {
			console.log(err)
		}
	});

	// ********************************************************************** POST **********************************************************

	server.post('/JSON/upload/messages', authenticate, async (req, res) => {
		let username = req.session.username
		let text		= req.body.text;

		try {
			await insert.supportTicket(text, username)
			res.redirect('/profile/support')
			
		} catch (error) {
			console.log(error) 
		}
	});

	
};