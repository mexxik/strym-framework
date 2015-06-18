var framework               = require('./../framework');

var AMQPConnector           = require('./../lib/connectors/amqp');

var SenderService           = require('./services/sender');
var ReceiverService         = require('./services/receiver');

exports.group = {
    setUp: function(callback) {
        this.container = framework.createContainer();

        var amqpConnector = new AMQPConnector();
        this.container.registerConnector(amqpConnector);

        this.sender = new SenderService();
        this.receiver = new ReceiverService();
        this.container.registerService(this.sender);
        this.container.registerService(this.receiver);

        this.container.on('started', function() {
            callback();
        });

        this.container.start();
    },
    testRegisteredCall: function(test) {
        var random = Math.random();

        this.sender.sendRegisteredCall(random, function(response) {
            test.equals(response, random);
            test.done();
        });

    }/*,
    testPrototypeCall: function(test) {
        var random = Math.random();

        this.sender.sendPrototypeCall(random, function(response) {
            test.equals(response, random);
            test.done();
        });
    }*/
};