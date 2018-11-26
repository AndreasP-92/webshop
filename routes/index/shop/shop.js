const getAll        = require('../../services/getAll');
const getAllWhere   = require('../../services/getAllWhere');
const getOne        = require('../../services/getOne');
const insert        = require('../../services/insert');
const update        = require('../../services/update');

module.exports = (server) => {

// CATEGORIES ------------------------------------------

    server.get('/shop/:gender/:page',async function(req,res){
        let username    = req.session.username;
        let paging      = req.params.page;
        let gender_id   = req.params.gender;

        let getCategories       = await getAll.categories();
        let getAllProductsLimit = await getAll.productOffset(paging, gender_id);
        let getAllProducts      = await getAll.products(gender_id);
        let shopPageCheck = "allCategories" 
        try{
            res.render('pages/index/shop/shop',{
                shopPageCheck   : shopPageCheck,
                allProducts     : getAllProductsLimit,
                productCount    : getAllProducts,
                categories      : getCategories,
                'txt'           : 0,
                'category'      : 0,
                'price'         : 0,
                'gender'        : 0,
                'genderId'      : gender_id,
                'username'      : username
            })

        }catch(e){
            console.log(e)
        }
    });

// SEARCH FOR PRODUCT -----------------------------------

    server.post('/shop/search', async (req, res) => {
        let shopPageCheck = "search";
        let productList   = req.body.productList;
        let username      = req.session.username;

        if(productList == undefined || productList == ""){
            productList = 10
        }

        let txt         = req.body.txt;
        let category    = req.body.category;
        let price       = req.body.price;
        let gender      = req.body.gender;

        let produkter       = await getAll.search(txt, category, price, gender, productList);
        let getCategories   = await getAll.categories();
        let allProducts     = await getAll.products();
        try{
            res.render('pages/index/shop/shop', {
                'allProducts'   : produkter,
                'productCount'  : allProducts,
                'shopPageCheck' : shopPageCheck,
                'categories'    : getCategories,
                'txt'           : txt,
                'category'      : category,
                'price'         : price,
                'gender'        : gender,
                'productList'   : productList,
                'username'      : username
            });

        }catch(e){
            console.log(e)
        }
    });

// WOMAN CATEGORIES --------------------------------------

    server.get('/shop',function(req,res){
        let shopPageCheck   =   "WomenCategories";
        let username        =   req.session.username;

        res.render('pages/index/shop/shop',{
            shopPageCheck   : shopPageCheck,
            'username'      : username
        })
    });

// MEN CATEGORIES ------------------------------------

    server.get('/shop',function(req,res){
        let shopPageCheck   = "menCategories" ;
        let username        = req.session.username;

        res.render('pages/index/shop/shop',{
            shopPageCheck   : shopPageCheck,
            'username'      : username
        })
    });

    server.get('/shop',function(req,res){
        let shopPageCheck = "allProducts";
        let username      = req.session.username;

        res.render('pages/index/shop/shop',{
            shopPageCheck   : shopPageCheck
        })
    });

// SPECIFIC PRODUCT ----------------------------------

    server.get('/product/:id',async function(req,res){
        let productId       = req.params.id;
        let shopPageCheck   = "oneProduct" ;
        let username        = req.session.username;

        try{
            let getCategories   = await getAll.categories();
            let allProducts     = await getOne.product(productId);
            let reviews         = await getAll.review(allProducts[0].product_name); 
            let voteCount       = await getAll.voteCount(allProducts[0].product_name)
            let reviewCount     = await getAll.reviewCount(allProducts[0].product_name)

            let overallRating   = parseInt(voteCount[0].product_votes) / parseInt(reviewCount[0].review_product)
            var completeRating = overallRating.toFixed(2)

            if(voteCount[0].product_votes == 0 || reviewCount[0].review_product == 0){
                var completeRating = 0
            }

            res.render('pages/index/shop/shop',{
                'shopPageCheck'     : shopPageCheck,
                'categories'        : getCategories,
                'product'           : allProducts,
                'review'            : reviews,
                'voteCount'         : voteCount,
                'reviewCount'       : reviewCount,
                'overallRating'     : completeRating,
                'username'          : username
            })

        }catch(e){
            console.log(e)
        }
    });

// ***************************************************************************** POST *******************************************************************************

// INSERT REVIEW ---------------------------

    server.post('/shop/review/:id', async (req,res)=>{
        let productId       =   req.params.id;
        let username        =   req.session.username;
        let text            =   req.body.review;
        let starRating      =   req.body.rate;

        let getProduct      = await getOne.product(productId);
        let getUser         = await getAllWhere.profile(username);

        let totalVotes      =   parseInt(getProduct[0].product_votes) + parseInt(starRating);
        let productName     =   getProduct[0].product_name;
        let firstname       =   getUser[0].profile_firstname;
        let lastname        =   getUser[0].profile_lastname;
        let name            =   firstname +' '+ lastname

        await   insert.starRating(productName, name, text, starRating)
        await   update.totalVotes(totalVotes, productId)

        res.redirect('/product/'+productId)
    });
};