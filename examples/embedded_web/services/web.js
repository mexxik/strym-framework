var framework   = require('./../../../framework');

var WebService = module.exports = function HttpService() {

};

framework.inheritService(WebService);


WebService.prototype.webRequest = function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('embedded web response\n');
};