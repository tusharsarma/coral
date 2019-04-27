const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com',
    port:'3306',
    user: 'dummyUser',
    database: 'db_intern',
    password: 'dummyUser01'
});

module.exports = pool.promise();