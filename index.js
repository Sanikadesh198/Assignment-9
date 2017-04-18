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
    console.log('Responding to a request');
    /*  var url = req.url;

      var filename = 'index.html';
      if (url.length > 1) {
          filename = url.substring(1);
      }
      //res.end('<h1>Hello, World</h1>');
      console.log(filename);
      var filePath = path.resolve(__dirname, 'app', filename);*/
    var filePath = extract(req.url);
    fs.readFile( /*'app/index.html'*/ filePath, function(err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            var contentType = mime.lookup(filePath);
            res.setHeader('Content-Type', contentType);
            res.end(data);
        }

    });
});
server.listen(3000);
