var framework           = require('./../framework');

var BasicService        = require('./services/basic');

exports.testEmptyConfig = function(test) {
    var container = framework.createContainer('');
    test.done();
};

exports.group = {
    setUp: function(callback) {
        this.container = framework.createContainer(__dirname + '/properties.json');
        this.service = new BasicService();
        this.container.registerService(this.service);
        this.container.start();

        callback();
    },
    testProperty1: function(test) {
        test.equals(this.service.getProperty('property_1'), 'property 1');
        test.done();
    },
    testProperty2: function(test) {
        test.equals(this.service.getProperty('property_2.property_2_1'), 'property 2 1');
        test.done();
    }
};

