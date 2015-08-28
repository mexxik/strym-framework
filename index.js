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
        return new InternalConnector();
    },
    AMQPConnector: function() {
        return new AMQPConnector();
    },
    SocketConnector: function() {
        return new SocketConnector();
    }
};