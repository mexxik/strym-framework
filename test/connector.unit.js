var framework               = require('./../framework');

var InternalConnector       = require('./../lib/connectors/internal');

exports.testConnectorsStarted = function(test) {
    this.container = framework.createContainer();

    this.connector = new InternalConnector();
    this.container.registerConnector(this.connector);

    this.container.on('started', function() {
        test.done();
    });

    this.container.start();
};