var util        = require('util');

var Container   = require('./lib/container');
var Service     = require('./lib/basic/service');

var InternalConnector   = require('./lib/connectors/internal');
var AMQPConnector       = require('./lib/connectors/amqp');
var SocketConnector     = require('./lib/connectors/socket');

module.exports = {
    createContainer: function(configPath) {
        var container = new Container(configPath);
        return container;
    },
    inheritService: function(childService) {
        util.inherits(childService, Service);
    },
    InternalConnector: function() {
        return InternalConnector;
    },
    AMQPConnector: function() {
        return AMQPConnector;
    },
    SocketConnector: function() {
        return SocketConnector;
    }
};