var util        = require('util');

var Service     = require('./../../lib/service');


var ReceiverService = module.exports = function ReceiverService() {
    this.id = 'receiverService';
};

util.inherits(ReceiverService, Service);

ReceiverService.prototype.postRegister = function(dispatcher) {
    this.registerCall('registeredCall', function(params, callback) {
        callback(params);
    });
};

ReceiverService.prototype.prototypeCall = function(params, callback) {
    callback(params);
};