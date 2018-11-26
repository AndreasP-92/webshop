module.exports = (server) => {


    server.get('/admin',function(req,res){
        res.render('pages/admin/adminDashboard',{

        })
    })

}