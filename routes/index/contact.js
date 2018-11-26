const sendEmail         = require('../services/sendEmail')

module.exports = (server) => {


    server.get('/contact',function(req,res){
        let username    =   req.session.username;

        res.render('pages/index/contact',{
            'username'  :   username
        })
    })

// ******************************************************************************* POST **************************************************************************

    server.post('/send/contact', async function(req, res){
        let name    =   req.body.name;
        let mail    =   req.body.mail;
        let text    =   req.body.text;

        try {
            await sendEmail.contact(name, mail, text)
            res.redirect('/contact')
            
        } catch (error) {
            console.log(error)
        }
    })

}