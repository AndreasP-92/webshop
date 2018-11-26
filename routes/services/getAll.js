const db = require('../../config/database').connect()

module.exports = {

// ********************************************************************* LOGIN *********************************************************************

    users: function () {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM tb_users`;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
// ********************************************************************* SHOP *********************************************************************
    
    products: function (gender) {
        return new Promise((resolve, reject) => {
    
            if (gender == 0 || gender == undefined) {
                gender = []
                for (i = 0; i < 10; i++)gender.push(i);
            }
            
            var sql = `
            SELECT 
                *
            FROM(
                tb_products 
            INNER JOIN 
                tb_products_gender ON fk_gender = gender_id)
            WHERE
                fk_gender in (${gender})                   
            `;
            
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    productOffset: function (page, gender) {
        return new Promise((resolve, reject) => {

            if (gender == 0 || gender == undefined) {
                gender = []
                for (i = 0; i < 10; i++)gender.push(i);
            }
            
            var sql = `
            SELECT 
                * 
            FROM(
                tb_products 
            INNER JOIN 
                tb_products_gender ON fk_gender = gender_id)
            WHERE
                fk_gender in (${gender}) 
            LIMIT
                11
            OFFSET
                ${page}
            `;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    categories: function () {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM tb_products_category`;
        
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    review:function(product){
        return new Promise((resolve,reject)=>{
            var sql = `
            SELECT
                *,
                DATE_FORMAT(review_date, '%d/%m-%y') AS review_date
            FROM
                tb_reviews
            WHERE
                review_product = ?
            `
            db.query(sql,product,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    reviewCount:function(product){
        return new Promise((resolve,reject)=>{
            var sql = `
                SELECT 
                    COUNT(review_product) as review_product
                FROM
                    tb_reviews
                WHERE
                    review_product = ?
            `
            db.query(sql,product, function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    voteCount:function(product){
        return new Promise((resolve,reject)=>{
            var sql = `
                SELECT 
                    product_votes
                FROM
                    tb_products
                WHERE
                    product_name = ?
            `
            db.query(sql,product, function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
// ********************************************************************* SEARCH *********************************************************************
    
    search: function (txt, category, price, gender, productList) {
;
        if(txt == ""){
            txt = "_"
        }

        if (category == 0 || category == undefined) {
            category = []
            for (i = 0; i < 10; i++)category.push(i);
        }

        if (gender == 0 || gender == undefined) {
            gender = []
            for (i = 0; i < 10; i++)gender.push(i);
        }
        price = (price == '' || isNaN(price))? 1000000 : price;

        return new Promise((resolve, reject) => {

            var sql = `
                SELECT 
                    *
                FROM(((
                    tb_products 
                INNER JOIN 
                    tb_products_category ON fk_category = category_id)
                Inner JOIN 
                    tb_products_gender ON fk_gender = gender_id)
                INNER JOIN 
                    tb_producent ON fk_producent = producent_id)
                WHERE
                product_name like '%${txt}%' and
                fk_category in (?) and
                fk_gender in (?) and                    
                product_price <= ?
                LIMIT
                    ${productList}
            `;

            db.query(sql, [category, gender ,price], function (err, result) {
                if (err) reject(err);

                resolve(result);
            })
        })

    },
}

