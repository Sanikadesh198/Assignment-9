var http = require('http');
var fs = require('fs');
//var path = require('path');
var extract = require('./extract');
var wss = require('./websockets-server');
var handleError = function(err, res) {
    res.writeHead(404);
    res.end();
};

var server = http.createServer(function(req, res) {
    console.log('Responding to a request.');

    //var url = req.url;
    //if (url.length > 1) {
    //fileName = url.substring(1);
    //}
    //console.log(fileName);

    //res.end('<h1>Hello, World!!</h1>');
    //var filePath = path.resolve(__dirname, 'app', fileName);
    var filePath = extract(req.url);
    fs.readFile(filePath, function(err, data) {
        if (err) {
            //handleError(err, res);
            var fileName = 'error.html';
            console.log(fileName);
            fs.readFile('app/error.html', function(err, data) {
                res.end(data);
            });

            return;
        } else {
            //res.setHeader('Content-Type', 'text/html');

            var mime = require('mime');
            mime.lookup('/path/to/file.txt'); // => 'text/plain'
            /*mime.lookup('file.txt');                  // => 'text/plain'
            mime.lookup('.TXT');                      // => 'text/plain'
            mime.lookup('htm');                       // => 'text/html'
            mime.lookup('application/pdf');                      //=>'text/plain'
            mime.lookup('.JPG');*/
            mime.lookup('application/octet-stream');
            //console.log(mime.contentType('index.html'));
            res.end(data);
        }
    });
});
server.listen(3000);
