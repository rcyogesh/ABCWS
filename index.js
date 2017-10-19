var http = require('http');
const url = require('url');
const util = require('util');
const letterFunction = require('./letter');

var server = http.createServer(function(request, response) {
    const parsedURL = url.parse(request.url, true);

    if(parsedURL.href.toLowerCase().indexOf("favicon.ico") != -1)
    {
        response.end();
        return;
    }
    
    response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});

    var letter = parsedURL.query.letter;
    var bpEntry = parsedURL.query.BP;
    console.log(parsedURL.href);
        //console.log(request.url);
    if(letter != "" && letter != undefined){
        letterFunction.process(letter, response);
    }
    else {
        response.end("Please specify a letter");
    }
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);