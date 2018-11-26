const getAll        = require('../services/getAll');
const getOne        = require('../services/getone');

module.exports = (server) => {



// SHOW ALL USERS =======================================

    server.get('/admin/users', async function(req,res){
        let userSite ="allUsers"
        try{
            const Users = await getAll.users();
            res.render('pages/admin/adminUsers',{
                userSite    : userSite,
                users       : Users
            
            })
        }catch(e){
            console.log(e)
        }

    });

// EDIT ONE USER =======================================

    server.get('/admin/users/:id', async function(req,res){

        let userId  = req.params.id;
        let userSite ="oneUser"
        try{
            const Users = await getOne.user(userId);

            // res.send()
            res.render('pages/admin/adminUsers',{
                userSite    : userSite,
                user       : Users
            
            })
        }catch(e){
            console.log(e)
        }

    })
}