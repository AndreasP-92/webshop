const db    = require('../../config/database').connect()
const Hash  = require('./hash');

module.exports = {

// ****************************************************************************** PROFILE ***********************************************************************

    profileInfo: function(username, firstname, lastname, emai){
        return new Promise ((resolve,reject)=>{

            let prepare = [firstname, lastname, emai, username]

            sql = `
            UPDATE
                tb_profiles
            SET
                profile_firstname       = ?,
                profile_lastname        = ?,
                profile_mail            = ?
            WHERE 
                profile_username        = ?
            `
            db.query(sql,prepare,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

    profilePassword: function(username, password){
        return new Promise (async (resolve,reject)=>{

            const hash = await Hash(password);

            let prepare = [hash, username]

            sql = `
            UPDATE
                tb_users
            SET
                user_passphrase     = ?
            WHERE 
                user_username       = ?
            `
            db.query(sql,prepare,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

    shippingInfo: function(adress, adress2, zip, city, country, user){
        return new Promise ((resolve,reject)=>{

            var prepare = [adress, adress2, zip, city, country, user]


            sql = `
            UPDATE
                tb_profiles_shippinginfo
            SET
                shippinginfo_adress     = ?,
                shippinginfo_adress2    = ?,
                shippinginfo_zip        = ?,
                shippinginfo_city       = ?,
                shippinginfo_country    = ?
            WHERE 
                shippinginfo_user       = ?
            `
            db.query(sql,prepare,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

// ************************************************************************************ login *******************************************************************

    forgotPass: function(token, date, mail){
        return new Promise ((resolve,reject)=>{
            sql = `
            UPDATE
                tb_users
            SET
                resetPasswordToken      = '${token}',
                resetPasswordExpires    = '${date}'
            WHERE
                user_mail              = '${mail}'
            `
            db.query(sql, function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    userPass: function(passphrase, token){
        return new Promise(async (resolve, reject) => {
            const hash = await Hash(passphrase);
            sql = `
            UPDATE
                tb_users
            SET
                user_passphrase          = ?,
                resetPasswordToken  = ''
            WHERE
                resetPasswordToken  = ?
            `
            db.execute(sql,[hash, token], (err, result) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    },

// ************************************************************************************ PRODUCTS *******************************************************************

    totalVotes: function (totalVotes, productId) {
        return new Promise((resolve, reject) => {
            let sql = `
            UPDATE
                tb_products
            SET
                product_votes   =   ?
            WHERE
                product_id      =   ?
            `
            let prepare = [totalVotes, productId]
            db.query(sql,prepare, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
}