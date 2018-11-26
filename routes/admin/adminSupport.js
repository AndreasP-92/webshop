module.exports = (server) => {


    server.get('/admin/support',function(req,res){
        res.render('pages/admin/adminSupport',{

        })
    })

}