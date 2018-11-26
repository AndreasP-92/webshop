const db = require('../../config/database').connect()

module.exports = {

// ****************************************************************************** LOGIN ***********************************************************************

    profile: function (mail, firstname, lastname, img, username) {
        return new Promise((resolve, reject) => {
            let sql = `
            INSERT INTO
                tb_profiles
            SET
                profile_mail        = ?,
                profile_firstname   = ?,
                profile_lastname    = ?,
                profile_img         = ?,
                profile_username    = ?`;
            db.query(sql,[mail, firstname, lastname, img, username], function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },

// ****************************************************************************** PROFILE ***********************************************************************


    shippingInfo: function (user) {
        return new Promise((resolve, reject) => {
            let sql = `
            INSERT INTO
                tb_profiles_shippinginfo
            SET
                shippinginfo_user     = ?`

            db.query(sql,user, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    supportTicket: function (text, user, recipient) {
        return new Promise((resolve, reject) => {
            let sql = `
            INSERT INTO
                tb_support_messages
            SET
                message_status      = 'New',
                message_user        = ?,
                message_text        = ?,
                message_regarding   = ?,
                message_date        = now()
            `
            let prepare = [user, text, user]
            db.query(sql,prepare, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },

// ****************************************************************************** PROFILE ***********************************************************************

    basketHistory: function (user, idArray, totalPrice) {
        return new Promise((resolve, reject) => {
            let sql = `
            INSERT INTO
                tb_profiles_baskethistory
            SET
                history_user        = ?,
                history_products    = ?,
                history_price       = ?,
                history_status      = 'Order Recived',
                history_date        = now()
            `
            let prepare = [user, idArray, totalPrice]
            db.query(sql,prepare, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },

// ****************************************************************************** SHOP ***********************************************************************
    order: function (firstname, lastname, adress, adress2, city, zip, country, mail, phone, idArray, totalPrice) {
        return new Promise((resolve, reject) => {
            let sql = `
            INSERT INTO
                tb_shop_orders
            SET
                order_mail      = ?,
                order_phone     = ?,
                order_products  = ?,
                order_firstname = ?,
                order_lastname  = ?,
                order_adress    = ?,
                order_adress2   = ?,
                order_city      = ?,
                order_zip       = ?,
                order_country   = ?,
                order_status    = 'Order Recived',
                order_price     = ?,
                order_date      = now()
            `
            let prepare = [mail, phone, idArray, firstname, lastname, adress, adress2, city, zip, country, totalPrice]
            db.query(sql,prepare, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    starRating: function (productName, name, text, starRating) {
        return new Promise((resolve, reject) => {
            let sql = `
            INSERT INTO
                tb_reviews
            SET
                review_product  =   ?,
                review_author   =   ?,
                review_text     =   ?,
                review_vote     =   ?,
                review_date     =   now()
            `
            let prepare = [productName, name, text, starRating]
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