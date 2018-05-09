const CSVRead = require('csv-read');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bitstamp'
});

connection.connect();

const csv = CSVRead.load('bitstampUSD.csv', {
	encoding: 'utf8'
});
 
csv.parse((line) => {
	console.log(line) // ['col1', 'col2', 'col3']
	connection.query(`INSERT INTO btc_usd_test (amount, price, timestamp) VALUES ('${line[2]}', '${line[1]}', '${line[0]}');`, 
		function (error, results, fields) {
		if (error) throw error;
	});
}).then((numLine) => {
	console.log(`${numLine} lines parsed`)
});