var util            = require('util');

var amqp            = require('amqp');
var uuid            = require('node-uuid');

var Connector       = require('./connector');



var EXCHANGE_NAME = 'sf.rpc';
var QUEUE_NAME_BASE = 'sf.rpc';

var AMQPConnector = module.exports = function AMQPConnector() {

};

util.inherits(AMQPConnector, Connector);

AMQPConnector.prototype.start = function(callback) {
    var self = this;

    self.calls = {};

    var queueId = uuid.v4();
    var queueName = QUEUE_NAME_BASE + '.' + queueId;

    var host = 'localhost';
    var login = 'guest';
    var password = 'guest';

    var amqpEnv = process.env.AMQP;
    if (amqpEnv) {
        host = amqpEnv.split(':')[0];
        login = amqpEnv.split(':')[1];
        password = amqpEnv.split(':')[2];
    }

    self.connection = amqp.createConnection({ host: host, login: login, password: password});

    self.connection.on('error', function(error) {
        console.log('amqp error: ' + error);
    });

    self.connection.on('ready', function() {
        self.exchange = self.connection.exchange(EXCHANGE_NAME, {type: 'topic', exclusive: false, autoDelete: false}, function(exchange) {
            self.queue = self.connection.queue(queueName, {exclusive: true, autoDelete: true}, function (queue) {
                queue.bind(exchange.name, '#');
                queue.bind(exchange.name, queueName);

                queue.subscribe(function(message) {
                    switch (message.type) {
                        case 'request':

                            self.dispatcher.processRPC(message.name, message.params, {}, function(response) {
                                self._sendResponse(message.name, response, message.correlationId);
                            });

                            break;

                        case 'response':

                            if (self.calls[message.correlationId]) {
                                self.calls[message.correlationId].call({}, message.params);
                                self.calls[message.correlationId] = null;
                                delete self.calls[message.correlationId];
                            }

                            break;
                    }
                });

                self.connected = true;

                callback();
            });
        });
    });
};

AMQPConnector.prototype.rpc = function(name, params, options, callback) {
    if (this.connected) {
        var correlationId = uuid.v4();

        this.calls[correlationId] = callback;

        var message = {
            correlationId: correlationId,
            type: 'request',
            name: name,
            params: params
        };

        this.exchange.publish('', message);
    }
};

AMQPConnector.prototype._sendResponse = function(name, params, correlationId) {
    if (this.connected) {
        var message = {
            correlationId: correlationId,
            type: 'response',
            name: name,
            params: params
        };

        this.exchange.publish('sf.rpc.' + correlationId, message);
    }
};