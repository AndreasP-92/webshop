const getAll            = require('../services/getAll');
const getAllWhere       = require('../services/getAllWHere');

module.exports = (server) => {


    server.get('/', async function(req,res){
        let username    =   req.session.username;

        try {
            const menShoes      = await getAllWhere.shoesWithLimit(1)
            const womenShoes    = await getAllWhere.shoesWithLimit(2)

            res.render('pages/index/index',{
                'menShoes'      :   menShoes,
                'womenShoes'    :   womenShoes,
                'username'      :   username
    
            })
            
        } catch (error) {
            console.log(error)   
        }
    })

}