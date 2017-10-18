var http = require('http');
const { Pool } = require('pg');
const url = require('url');
const util = require('util');
const fs = require('fs');

var pg = new Pool({      
        user: 'rcyogesh@rcpgserver.postgres.database.azure.com',
        host: 'rcpgserver.postgres.database.azure.com',
        database: 'Test',
        password: 'RC4yogesh',
        port: 5432,
    });

var server = http.createServer(function(request, response) {
    const parsedURL = url.parse(request.url, true);
    
    response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});

    var letter = parsedURL.query.letter;
    console.log(letter);
    if(letter == "" || letter == undefined){
        response.end("Please specify a letter");
    }
    else {
        pg.query(util.format("SELECT * FROM public.\"Words\" where \"Words\" LIKE '%s%%'", parsedURL.query.letter),
            function(qErr, qRes) {
                if(qErr) {
                    response.end(qErr.message);
                }
                else {
                    var json = JSON.stringify(qRes.rows.map(element=>element.Words));
                    response.write(json);
                    fs.open("fileBlob.txt", "a", function(err, fd){
                        if(!err) {
                            fs.write(fd, json + "\r\n", function(err, written, str) {
                                fs.close(fd);
                            });
                        }
                    });
                    response.end();
                }
            });
    }
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
