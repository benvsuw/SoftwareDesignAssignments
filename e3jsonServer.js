var http = require("http");
var url = require("url");

function handleRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  var urlObj = url.parse(request.url, true);
  if (urlObj.pathname === '/api/parsetime') {
    var isoObj = urlObj.query['iso'];
    var dateObj = new Date(isoObj.toString());
    response.write(JSON.stringify({ hour: dateObj.getHours(), minute: dateObj.getMinutes(), second: dateObj.getSeconds() }));
  }
  if (urlObj.pathname.toString() === '/api/unixtime') {
    var isoObj = urlObj.query['iso'];
	var dateObj = new Date(isoObj.toString());
    response.write(JSON.stringify({unixtime: dateObj.getTime() }));
  }
  response.end();
}

var httpServer = http.createServer(handleRequest).listen(process.argv[2]);
