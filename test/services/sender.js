var util        = require('util');

var Service     = require('./../../lib/basic/service');


var SenderService = module.exports = function SenderService() {
    this.name = 'senderService';
};

util.inherits(SenderService, Service);

SenderService.prototype.start = function(callback) {
    callback();
};

SenderService.prototype.sendRegisteredCall = function(params, callback) {
    this.rpc('registeredRPC', params, null, function(response) {
        callback(response);
    });
};

SenderService.prototype.sendPrototypeCall = function(params, callback) {
    this.rpc('prototypeRPC', params, null, function(response) {
        callback(response);
    });
};