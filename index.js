var http = require('http');
const url = require('url');
const util = require('util');
const letterFunction = require('./letter');
const bp = require('./bp');
const qs = require('querystring');

var server = http.createServer(function(request, response) {
    console.log("called");
    //console.log(request);
    const parsedURL = url.parse(request.url, true);

    if(request.method=="POST") {

        var wholeData = '';
        request.on('data', (data)=> {
            wholeData += data;
        });

        request.on('end', ()=>{
            let json = wholeData.toString();
            bp.process(JSON.parse(json));
        })

        return;
    }
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
    else if(bpEntry != "" && bpEntry != undefined){
        var r = new RegExp("([0-9]+),([0-9]+),([0-9]+)(,([0-9]+))?");
        var m = r.exec(bpEntry);
        m.forEach(function(element) {
            //console.log(element);
        }, this);
        console.log(m[1]);
        bp.process(m[1], m[2], m[3], m[5], response);
        response.end();
    }
    else {
        response.end("Please specify a letter");
    }
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);