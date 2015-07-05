var fs          = require('fs');

var framework   = require('./../../../framework');

var WebService = module.exports = function HttpService() {

};

framework.inheritService(WebService);


WebService.prototype.webRequest_ = function(request, response) {
    fs.readFile(__dirname + '/html/index.html', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
};