const mysql = require('mysql2')

module.exports = {
    'connect': () => {
        return mysql.createConnection({
            'host': 'localhost',
            'user': 'root',
            'password': '',
            'database': 'perfectshoes'
        });
        doMultipleQueries(function(err){
            connect.end();
       })
    },
}