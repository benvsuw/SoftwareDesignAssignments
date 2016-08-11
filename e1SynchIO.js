var fs = require("fs");
var buffer = fs.readFileSync(process.argv[2])
var str = buffer.toString();
var strSplit = str.split('\n');
console.log(Number(strSplit.length - 1));



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwed',
  database : 'sys'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * from sys.guest', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();