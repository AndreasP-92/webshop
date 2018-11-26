//const debug = require('debug')('server:register');

const User 			= require('../services/users');
const getAll 		= require('../services/getAll');
const getOne		= require('../services/getOne');
const insert		= require('../services/insert');
const authenticate 	= require('../../middleware/authenticate');



module.exports = function (server) {
	server.get('/register', async (req, res) => {
		let username	=	req.session.username;
		try {
			res.render('pages/login/register', { 
			'page'		: { 'title': 'Register' },
			'username'	: username
			});
			
		} catch (error) {
			console.log(error)	
		}
	});


	server.get('/register/find/:user',async function(req,res){
		let User = req.params.user
		try{
			const user = await getOne.userCount(User);
			res.send(user)
		}catch(e){
			console.log(e)
		}
	})

// *************************************************************************** POST ***********************************************************

	server.post('/user/post', async (req, res) => {

		let name		= req.body.name;
		let lastname	= req.body.lastname;
		let mail 		= req.body.email;
		let sampleFile	= req.files.sampleFile;
		let username	= req.body.username;
		let passphrase	= req.body.passphrase;

		if (req.files.sampleFile == undefined){

			filePlaceholder = 'comming later'

			try {
				result 			= await User(username, passphrase, mail, name, filePlaceholder);
				inserProfile	= await insert.profile(mail, name, lastname, filePlaceholder, username)
				inserProfile	= await insert.shippingInfo(username)
				if (result === true) {
				res.redirect('/login')
				} else {
					res.send('poop');
				}
				
			} catch (err) {
				console.log(err)
			}
		}else{

			sampleFiles = sampleFile.name
			sampleFile.mv(`public/resources/media/${sampleFile.name}`, async function(err) {

				try {
					result 			= await User(username, passphrase, mail, name, sampleFile.name);
					inserProfile	= await insert.profile(mail, name, lastname, sampleFiles, username)
					inserProfile	= await insert.shippingInfo(username)

					if (result === true) {
						res.redirect('/login')
					} else {
						res.send('poop');
					}
					
				} catch (err) {
					console.log(err)
				}
			});

		}

	});
};
