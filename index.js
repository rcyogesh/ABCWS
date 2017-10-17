var http = require('http');
const { Pool } = require('pg');
const url = require('url');
const util = require('util');

var server = http.createServer(function(request, response) {

    var pg = new Pool({      
         user: 'rcyogesh@rcpgserver.postgres.database.azure.com',
         host: 'rcpgserver.postgres.database.azure.com',
         database: 'postgres',
         password: 'RC4yogesh',
         port: 5432,
        //  sslmode: 'require'
     });
    const parsedURL = url.parse(request.url, true);
    //response.write(request.url);
    response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});
    pg.connect(function(err, client){
        if(err) {
            response.end(err.message);
        }else  {
            const res = client.query(util.format("SELECT * FROM public.\"Words\" where \"Words\" LIKE '%s%%'", parsedURL.query.letter), 
            function(qErr, qRes) {
                if(qErr) {
                    response.end(qErr.message);
                }
                else {
                    response.write(JSON.stringify(qRes.rows.map(element=>element.Words)));
                    response.end();
                }
            });
        }
    });

    //response.end("hello azure")
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
