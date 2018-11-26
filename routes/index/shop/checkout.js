const stripe            = require('stripe')('sk_test_hAMKkJPjOWFgKvF8RCVogewX')
const getAllWhere       = require('../../services/getAllWHere');
const insert            = require('../../services/insert');
const sendEmail         = require('../../services/sendEmail')
module.exports = (server) => {

// *********************************************************************** CHECKOUT PAGE ******************************************************************** 

    server.get('/checkout', async function(req,res){
        let cart        =   req.session.cart
        let username    =   req.session.username

    // PREPAREING PRODUCT ARRAY -----------
        class Product{
            constructor (name, price, total, text, count, colour, image, id){
            this.name 	= name
            this.price 	= price
            this.total 	= total
            this.text 	= text
            this.count	= count
            this.colour	= colour
            this.image	= image
            this.id	    = id
            }
        }
    
    // VALIDATING CART ------------   
        if(req.session.cart == undefined){
            cart = []
        }
        
        productIdArray = []
    
    // LOOKING FOR PRODUCT ID ------------  
        for(i = 0; i < cart.length; i++){
            productIdArray.push(cart[i].id)
        }

        var getProductsArray = []

    // CREATING PRODUCT ARRAY ------------  
        if(productIdArray.length >= 1){
            var getProducts   = await getAllWhere.products(productIdArray)
                for(i = 0, j = 0; i < getProducts.length && j < cart.length; i++, j++){
                    let name    = getProducts[i].product_name
                    let price 	= cart[j].price
                    let total 	= cart[j].total
                    let text 	= getProducts[i].product_text
                    let count	= cart[j].count
                    let colour	= cart[j].colour
                    let image	= getProducts[i].product_img
                    let id	    = getProducts[i].product_id
                    var product = new Product(name, price, total, text, count, colour, image, id)
                    getProductsArray.push(product)
                }
        }
        
        try {
            res.render('pages/index/shop/checkout',{
                'username'  :   username
            })
            
        } catch (error) {
            console.log(error)
        }


    });

    server.get('/finish', async function(req,res){
        let username    =   '';

        try {
            if(req.session.username){
                let username    =   req.session.username;

                let profile =   await getAllWhere.profile(username);
                let getInfo =   await getAllWhere.shippinginfo(username);

                res.render('pages/index/shop/finishCheckout',{
                    'info'      :   getInfo[0],
                    'username'  :   username,
                    'profile'   :   profile[0]
                })
            }else{
                res.render('pages/index/shop/finishCheckout',{
                    'username'  :   username
                })
            };
            
        } catch (error) {
            console.log(error)
        }
    })

// *********************************************************************************** CLIENT POST CART ***********************************************************

    server.post('/test',function(req,res){

        req.session.cart = req.body
        res.redirect('/checkout')

    })

// ************************************************************************************** POST ***********************************************************


// CHARGING ===============================
    
    server.post("/charge", async (req, res) => {
        let idArray         = req.body.idArray;
        let email           = req.body.stripeEmail;
        let totalPrice      = req.body.TotalPrice;
        let username        = req.session.username;

        if(idArray == ""){
            idArray = 0;
        }

        let firstname       = req.body.firstname;
        let lastname        = req.body.lastname;
        let adress          = req.body.adress;
        let adress2         = req.body.adress2;
        let city            = req.body.city;
        let zip             = req.body.zip;
        let country         = req.body.country;
        let mail            = req.body.mail;
        let phone           = req.body.phone;

        const getUser       =   await getAllWhere.profileEmail(email);
        const getProducts   =   await getAllWhere.products(idArray);
// SEND ORDER MAIL
        await sendEmail.order(mail, getProducts, totalPrice);
// SEND ORDER TO WAREHOUSE 
        await insert.order(firstname, lastname, adress, adress2, city, zip, country, mail, phone, idArray, totalPrice);
// INSERT ORDER HISTORY
        await insert.basketHistory(getUser[0].profile_username, idArray, totalPrice);

// SEND INFORMATION TO STRIPE
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then(customer => stripe.charges.create({
            amount: totalPrice,
            description: "Web Development Book",
            currency: "eur",
            customer: customer.id
        }))
        .then(res.render("pages/index/shop/charge",{'username':username}))
    })

}