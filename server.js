var http = require('http');
var fs = require('fs');
var server = new http.Server();
var url = require('url');
const jsdom = require("jsdom");
const JSDOM = jsdom['JSDOM'];

fixHeader = function (dom) {
    var arr = [
        //'http://ajax.microsoft.com/ajax/jquery/jquery-1.4.3.min.js',
        '/treeview_files/jquery-1.4.3.min.js',
        'alter-navigation.js'
    ];
    for(var i=0; i<arr.length; i++) {
        var script = dom.window.document.createElement('script');
        script.type = "text/javascript";
        //script.charset = "UTF-8";
        script.src = arr[i];
        dom.window.document.getElementsByTagName('head')[0].appendChild(script);
    }
    return dom;
};

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
server.listen(port, ip);
server.on('request', function(req,res){
    var URI = decodeURI(req.url);
    //console.log(URI);
    if(URI!="/"){
        URI=URI.split('?')[0];
        //console.log(URI);
        fs.readFile("."+URI,function(err, html){
            if(err){
                res.statusCode = 404;
                res.end(URI);
                return;
            }
            //res.writeHeader(200, {"Content-Type": "text/html"});
            if(~URI.indexOf('.htm')&&URI.indexOf('treeview.html')!==1) {
                //*
                html = fixHeader(new jsdom.JSDOM(html)).serialize();
                res.writeHeader(200, {"Content-Type": "text/html; charset=UTF-8"});
                res.write(html);
                res.end();
                /**/
                /*
                JSDOM.fromFile("."+URI).then(function(dom) {
                    html = fixHeader(dom).serialize();
                    res.writeHeader(200, {"Content-Type": "text/html; charset=UTF-8"});
                    res.write(html);
                    res.end();
                    //console.log('promise then' + URI);
                });
                /**/
            }else {
                //console.log('direct' + URI);
                res.write(html);
                res.end();
            }
        });
    }else{
        fs.readFile("./1cDocs.html",function(err, html){
            if(err){
                return;
            }
            //res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
});