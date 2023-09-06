//CITED: https://github.com/osu-cs340-ecampus/nodejs-starter-app

var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : ''
})

module.exports.pool = pool;
