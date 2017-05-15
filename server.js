var http = require('http');
var fs = require('fs');
var server = new http.Server();
var url = require('url');

server.listen(80, '0.0.0.0');
server.on('request', function(req,res){
    if(req.url!="/"){
        fs.readFile("."+req.url,function(err, html){
            if(err){
                res.statusCode = 404;
                res.end("Page not found");
                return;
            }
            //res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }else{
        fs.readFile("./Tadpoles.html",function(err, html){
            if(err){
                return;
            }
            //res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
});