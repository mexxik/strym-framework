var util        = require('util');

var Service     = require('./../../lib/service');


var SenderService = module.exports = function SenderService() {
    this.id = 'senderService';
};

util.inherits(SenderService, Service);

SenderService.prototype.sendRegisteredCall = function(params, callback) {
    this.call('registeredCall', params, null, function(response) {
        callback(response);
    });
};

SenderService.prototype.sendPrototypeCall = function(params, callback) {
    this.call('prototypeCall', params, null, function(response) {
        callback(response);
    });
};