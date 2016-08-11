function handleRequest(request, response) {
  fs.createReadStream(fileLoc).pipe(response);
}

var http = require("http");
var fs = require("fs");
var port = 8080;
if(process.argv.length > 2) { 
  port = process.argv[2];
}
var fileLoc = ' ';
if(process.argv.length > 3) {
  fileLoc = process.argv[3];
} 
var httpServer = http.createServer(handleRequest).listen(port);

