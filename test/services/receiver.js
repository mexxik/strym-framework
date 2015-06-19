var util        = require('util');

var Service     = require('./../../lib/basic/service');


var ReceiverService = module.exports = function ReceiverService() {
    this.name = 'receiverService';
};

util.inherits(ReceiverService, Service);

ReceiverService.prototype.start = function(callback) {
    callback();
};

ReceiverService.prototype.postRegister = function(dispatcher) {
    this.registerCall('registeredCall', function(params, callback) {
        callback(params);
    });
};

ReceiverService.prototype.prototypeCall = function(params, callback) {
    callback(params);
};