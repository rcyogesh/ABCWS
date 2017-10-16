var http = require('http');
//const { Pool } = require('pg');
const url = require('url');
const util = require('util');

var server = http.createServer(function(request, response) {

    // var pg = new Pool({      
    //     user: 'postgres',
    //     host: 'localhost',
    //     database: 'Test',
    //     password: 'masterkey',
    //     port: 5432,
    // });
    // const parsedURL = url.parse(request.url, true);
    // response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});
    // pg.connect(function(err, client){
    //     if(err) throw err;
    //     const res = client.query(util.format("SELECT * FROM public.\"Words\" where \"Words\" LIKE '%s%%'", parsedURL.query.letter), 
    //     function(qErr, qRes) {
    //         response.write(JSON.stringify(qRes.rows.map(element=>element.Words)));
    //         response.end();
    //     });
    // });

    response.end("hello azure")
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
