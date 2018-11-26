const authenticate 	= require('../../../middleware/authenticate');
const getAllWhere	= require('../../services/getAllWHere');
const insert        = require('../../services/insert');
const update        = require('../../services/update');


module.exports = function (server) {
	server.get('/profile/shippinginfo', authenticate, async (req, res) => {
		let username = req.session.username;

		const getUserInfo = await getAllWhere.shippinginfo(username);

		try {
			res.render('pages/index/profile/dashboard',{
				'page' 	    : 	'shippingInfo',
                'user'	    :	getUserInfo[0],
                'username'  :   username
			});
			
		} catch (error) {
			
		}
    });
    
// ********************************************************************** POST **********************************************************

    server.post('/JSON/post/shippingInfo', authenticate, async (req, res) => {
        let adress      = req.body.adress;
        let adress2     = req.body.adress2;
        let zip         = req.body.zip;
        let city        = req.body.city;
        let country     = req.body.country;
        let user        = req.session.username


        try {
            await update.shippingInfo(adress, adress2, zip, city, country, user)
            res.redirect('/profile/shippinginfo')
            
        } catch (error) {
        console.log(error) 
        }
    });
};