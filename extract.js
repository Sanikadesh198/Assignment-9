var path = require('path');

var extractFilePath = function(url) {
    var filePath;
    var filename = 'index.html';

    if (url.length > 1) {
        filename = url.substring(1);
    }
    console.log('The filename is: ' + filename);

    filePath = path.resolve(__dirname, 'app', filename);
    return filePath;
};

module.exports = extractFilePath;
