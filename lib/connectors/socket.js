var fs            = require('fs');
var util          = require('util');

var socketIO      = require('socket.io');

var Connector     = require('./connector');


var SocketConnector = module.exports = function SocketConnector() {

};

util.inherits(SocketConnector, Connector);

SocketConnector.prototype.start = function(callback) {
    var self = this;
    self.io = socketIO(this.webServer);
    self.io.on('connection', function(socket) {
        socket.on('_callRequest', function(data) {
            self.dispatcher.processCall(data.name, data.params, data.options, function(response) {
                socket.emit('_callResponse', {
                    correlationId: data.correlationId,
                    response: response
                });
            });
        });
    });

    callback();
};

SocketConnector.prototype.call = function(name, params, options, callback) {

};

SocketConnector.prototype.webRequest_sf_connector_js = function(request, response) {
    fs.readFile(__dirname + '/public/connector.js', function(err, data) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
    });
};
