function callback (err, data) {
  if(!err) {
    var strSplit = data.split('\n');
    console.log(Number(strSplit.length - 1));
  }
}
var fs = require("fs");
var str = fs.readFile(process.argv[2], 'utf8', callback)

