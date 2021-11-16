const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'MaSuperBDD',
  database : 'livre_or'
});
 
connection.connect();

module.exports = connection;