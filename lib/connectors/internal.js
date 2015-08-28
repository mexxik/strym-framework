var util        = require('util');

var Connector     = require('./connector');


var InternalConnector = module.exports = function InternalConnector() {

};

util.inherits(InternalConnector, Connector);

InternalConnector.prototype.start = function(callback) {
    callback();
};

InternalConnector.prototype.rpc = function(name, params, options, callback) {
    this.dispatcher.processRPC(name, params, options, callback);

    /*var registeredCalls = this.dispatcher.registeredCalls;
    for (var c in registeredCalls) {
        var registeredCall = registeredCalls[c];
        if (registeredCall.name === name) {
            registeredCall.callback.call({}, params, callback);
        }
    }*/
};