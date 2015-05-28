var framework               = require('./../framework');

var InternalConnector          = require('./../lib/connectors/internal');

var SenderService           = require('./services/sender');
var ReceiverService         = require('./services/receiver');

exports.group = {
    setUp: function(callback) {
        this.container = framework.createContainer(__dirname + '/config/basic.json');

        var internalConnector = new InternalConnector();
        this.container.registerConnector(internalConnector);

        this.sender = new SenderService();
        this.receiver = new ReceiverService();
        this.container.registerService(this.sender);
        this.container.registerService(this.receiver);

        this.container.start();

        callback();
    },
    testRegisteredCall: function(test) {
        var random = Math.random();

        this.sender.sendRegisteredCall(random, function(response) {
            test.equals(response, random);
            test.done();
        });

    },
    testPrototypeCall: function(test) {
        var random = Math.random();

        this.sender.sendPrototypeCall(random, function(response) {
            test.equals(response, random);
            test.done();
        });
    }
};