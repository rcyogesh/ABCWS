var http = require('http');
const url = require('url');
const util = require('util');
const fs = require('fs');

var words = [];
fs.readFile("textDB.txt", 'utf8', function(err, data){
    if(!err)
    {
        words = data.split("\n");
        for (var index = 0; index < words.length; index++) {
            words[index] = words[index].trim();
        }
    }
});

var server = http.createServer(function(request, response) {
    const parsedURL = url.parse(request.url, true);
    
    response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});

    var letter = parsedURL.query.letter;
    console.log(letter);
    if(letter == "" || letter == undefined){
        console.log("no letter");
        console.log(request.url);
        response.end("Please specify a letter");
    }
    else {
        handleLetter(letter, response);
    }
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);


function handleLetter(letter, response) {
    var subset = [];
    words.forEach(function(element) {
        if(element.startsWith(letter)) {
            subset.push(element);
        }
    }, this);
    var json = JSON.stringify(subset);
    response.write(json);
    response.end();
}