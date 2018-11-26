const db = require('../../config/database').connect()

module.exports = {

// ****************************************************************************** LOGIN ***********************************************************************

    userCount: function (user) {
        return new Promise((resolve, reject) => {
            var sql = `SELECT COUNT(user_username) as user_username FROM tb_users WHERE user_username = ?`;
            db.query(sql,user, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    user: function (userId) {
        return new Promise((resolve, reject) => {
            var sql = `            
            SELECT
                *
            FROM
                tb_users
            WHERE
                user_id = ?`;
            db.query(sql,userId, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    emailCount: function (mail) {
        return new Promise((resolve, reject) => {
            var sql = `
            SELECT COUNT(profile_mail) as profile_mail 
            FROM 
                tb_profiles 
            WHERE 
                profile_mail = ?`;
            db.query(sql,mail, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    userReset: function (token) {
        return new Promise((resolve, reject) => {
            var sql = `            
            SELECT COUNT(user_mail) as email 
            FROM 
                tb_users 
            WHERE 
                resetPasswordToken = ?`;
            db.query(sql, token,function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
// ****************************************************************************** SHOP ***********************************************************************

    product: function(productId){
        return new Promise((resolve,reject)=>{
            var sql=`
                SELECT 
                    *
                FROM
                    tb_products
                WHERE
                    product_id = ?
            `
            db.query(sql,productId,function(err,data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                };
            });
        });
    }
}

// SELECT
// product_name,
// product_price
// FROM(((
//     tb_products
// INNER JOIN
//     tb_products_category ON fk_category = category_id)
// Inner JOIN
//     tb_products_gender ON fk_gender = gender_id)
// INNER JOIN
//     tb_producent ON fk_producent = producent_id)
// WHERE
// product_name like '%u%' and
// fk_category in (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) and
// product_price <= 600


// var sql = `
// SELECT 
// product_name,
// product_price
// FROM(((
//     tb_products 
// INNER JOIN 
//     tb_products_category ON fk_category = category_id)
// Inner JOIN 
//     tb_products_gender ON fk_gender = gender_id)
// INNER JOIN 
//     tb_producent ON fk_producent = producent_id)
// WHERE
// product_name like '%${txt}%' and
// fk_category in (${kategori}) and                    
// product_price <= ${pris}
// `;