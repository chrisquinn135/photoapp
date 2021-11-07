const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Hello123',
    database:'csc317db',
    connectionLimit: 50,
    //waitForConnection: true,
    debug:false,
})

module.exports = pool.promise();