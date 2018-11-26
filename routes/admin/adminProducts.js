getAll = require('../services/getAll');

module.exports = (server) => {

    server.get('/admin/products',async function(req,res){
            var productPageCheck = ""        
            res.render('pages/admin/adminProducts',{
                productPageCheck : productPageCheck
            })
        })

    server.get('/admin/products/update',async function(req,res){
    var productPageCheck = "update"        
        try{
            const products  = await getAll.products();
                // console.log(products)
            res.render('pages/admin/adminProducts',{
                products : products,
                page: { 'title': 'test' },
                productPageCheck
            })
            
        }catch(e){
            console.log(e)
        }
        
    })
    server.get('/admin/products/create',async function(req,res){
        var productPageCheck = "create"        
            try{
                const products  = await getAll.products();
                    // console.log(products)
                res.render('pages/admin/adminProducts',{
                    page: { 'title': 'test' },
                    productPageCheck
                })
                
            }catch(e){
                console.log(e)
            }
            
        })
    // server.post('/admin')

}