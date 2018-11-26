const authenticate 		= require('../../../middleware/authenticate');
const getAllWhere       = require('../../services/getAllWHere');

module.exports = function (server) {
	server.get('/profile/history', authenticate, async (req, res) => {
		// let username	= 'admin';
		let username	= req.session.username;
		var prepareProductArray = [];
		var productArray		= [];

// CREATING PRODUCT HISTORY
		class History{
			constructor (name, price, status, date){
				this.name 	= name
				this.price 	= price
				this.status	= status
				this.date	= date
			}
		}

// UPDATING PRODUCT PREPARE PRODUCT ARRAY
		const getUserhistory	= await getAllWhere.basketHistory(username);

			for(i = 0; i < getUserhistory.length; i++){
				const getProducts	= await getAllWhere.products(getUserhistory[i].history_products)
				let product 		= []

				for(j = 0; j < getProducts.length; j++){
					product.push(getProducts[j].product_name)
				}
				prepareProductArray.push(product)	
			}

// CREATING PRODUCT ARRAY
			for(i = 0, j = 0; i < getUserhistory.length && j < prepareProductArray.length; i++, j++){
				let name 	= prepareProductArray[j];
				let price	= (getUserhistory[i].history_price/100).toFixed(2);
				let status	= getUserhistory[i].history_status;
				let date	= getUserhistory[i].history_date;

				var prepareProduct = new History(name, price, status, date);
				productArray.push(prepareProduct)
			}

// SEND TO CLIENT
		try {
			res.render('pages/index/profile/dashboard',{
				'page'			: 	'historyAll',
				'product'		:	productArray,
				'username'		:	username
			});
			
		} catch (err) {
			console.log(err)
		}
	});
};