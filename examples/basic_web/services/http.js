var http        = require('http');

var framework   = require('./../../../framework');

var HttpService = module.exports = function HttpService() {

};

framework.inheritService(HttpService);

HttpService.prototype.postRegister = function(dispatcher) {
    var self = this;

    http.createServer(function(req, res) {
        self.call('getRandomNumber', null, null, function(response) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(response + '\n');
        });
    }).listen(1337, '127.0.0.1');
};