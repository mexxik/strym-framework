var framework               = require('./../framework');

var BasicService           = require('./services/basic');

exports.testServicesStarted = function(test) {
    this.container = framework.createContainer();

    this.service = new BasicService();
    this.container.registerService(this.service);

    this.container.on('started', function() {
        test.done();
    });

    this.container.start();
};