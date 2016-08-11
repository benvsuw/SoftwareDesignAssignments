var http = require('http');
var bl = require('bl');
function callback (response) {
  response.pipe(bl(function (err, data) {
    if(!err) {
      var str = data.toString();
      console.log(str.length);
      console.log(str);
    }
  }));
}
if(process.argv.length > 2) { 
  http.get(process.argv[2], callback);
}
