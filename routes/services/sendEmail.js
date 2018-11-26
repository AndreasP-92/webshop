const nodeMailer    = require('nodemailer');
const login         = require('../../bin/aName');

module.exports = { 

// ******************************************************************************* SEND ORDER *******************************************************************'

    order: function (mail, products, totalPrice) {

        productArray = []

        for(i = 0; i < products.length; i++){
            productArray.push(products[i].product_name)
        }

        let price = (totalPrice/100).toFixed(2)

        emailOutput = `
        <h2>Thank you for shopping at Perfect Shoes</h2>
        <br>
        <br>
        <h3> Your orders are following: </h3>
        <p>${productArray}</p>
        <h3> With a total price of </h3> <p> €${price} </p>
        <p> Your Package will be packed shortly. You'll get a confirmation email, when it has been send.</p>
        <img src="cid:unique@kreata.ee"/>
        `

        var smtpTransport = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: login.emailUser,
                pass: login.emailPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let mailOptions = {
            from    :   'andreas130292@gmail.com',
            to      :   mail,
            subject :   'Perfect Shoes Order list',
            html    :   emailOutput,
            attachments: [{
                filename: 'thankyou.jpeg',
                path: './template/images/thankyou.jpeg',
                cid: 'unique@kreata.ee'
            }]
                    
        };
        let dato = new Date()
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(dato + '<br>' + error);
            }
            // console.log(dato +'<br>' + 'Message %s sent: %s' + '<br>', info.messageId, info.response);
        })
    },

// ******************************************************************************* SEND RESET PASS *******************************************************************'

    resetPass: function(token, done, req){
        mail = req.body.email;
        var smtpTransport = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: login.emailUser,
                pass: login.emailPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let mailOptions = {
            from: 'info@perfect-shoes.com',
            to: mail,
            subject: 'Reset Perfect Shoes User password',
            text: `You're recieving this email, because you've asked to reset your password. Please follow the link http://${req.headers.host}/reset/${token} the password.`
        };
        let dato = new Date()
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(dato + '<br>' + error);
            }
            // console.log(dato +'<br>' + 'Message %s sent: %s' + '<br>', info.messageId, info.response);
        })
    },

// ******************************************************************************* SEND CONTACT *******************************************************************'

    contact: function(name, mail, text){
        let output = `
        <h2> From : ${name} </h2>
        <h2> email : ${mail} </h2>
        <p> text : </p>
        <p> ${text} </p>
        `

        var smtpTransport = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: login.emailUser,
                pass: login.emailPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let mailOptions = {
            from: 'info@perfect-shoes.com',
            to: 'andreas@mrcaptain.info',
            subject: `Contact from Perfect Shoes Regarding ${name}`,
            html: output
        };
        let dato = new Date()
        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(dato + '<br>' + error);
            }
            // console.log(dato +'<br>' + 'Message %s sent: %s' + '<br>', info.messageId, info.response);
        })
    },
}