const authenticate 	    = require('../../middleware/authenticate');
const getAll            = require('../services/getAll');
const getAllWhere       = require('../services/getAllWhere');
const getOne		    = require('../services/getOne');
const update		    = require('../services/update');
const crypto            = require('crypto');
const nodeMailer        = require('nodemailer');
const waterfall         = require('async-waterfall');
const User 			    = require('../services/users');
const sendEmail         = require('../services/sendEmail')





module.exports = (server) => {

// *********************************************************************************** MAIN ROUTE *************************************************************

    server.get('/forgot', async function(req,res){
        let username    =   req.session.username;
        try {
            res.render('pages/login/forgotPass',{
                'username'  :   username
            })
        } catch (err) {
            console.log(err)
        }
    });

// FIND EMAIL ON USER ==========

    server.get('/forgot/find/:email',async function(req,res){
        let mail = req.params.email;

		try{
            let getEmail = await getOne.emailCount(mail);

			res.send(getEmail)
		}catch(e){
			console.log(e)
		}

    });

// RESET ROUTE =================
    server.get('/reset/:token', async function(req,res){
        let token = req.params.token;
        let username    = req.session.username;

        let getUserToken = await getOne.userReset(token)

        res.render('pages/login/resetPass',{
            'token'     :   token,
            'username'  :   username
        })

    })
    
// *********************************************************************************** FORGOT PASS POST *************************************************************

// SEND EMAIL =================

    server.post('/authenticate/forgot/post',async function(req,res){

        async function postToken(token, date, mail){
            postToken = await update.forgotPass(token, date, mail)
        }

        waterfall([
            function (done){
                crypto.randomBytes(20, async function(err, buf){
                    var token = buf.toString('hex');
                    var mail = req.body.email;
    
                    date = Date.now() + 3600000; // 1 hour
                    postToken(token, date, mail);
                    done(err,token);

                    await sendEmail.resetPass(token, done, req)
                })
            },
        ])
        res.redirect('/')
    });

// RESET PASSWORD ===============

    server.post('/JSON/reset/:token', async function(req,res){
        token   = req.params.token;
        pass    = req.body.pass;
        confirm = req.body.confirm;

        if(pass == confirm){
            updatePass = await update.userPass(pass, token);
        }

        try {
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    })
}