var util        = require('util');

var Starter     = require('./basic/starter');

var Dispatcher = module.exports = function Dispatcher() {
    this.registeredCalls = {};
    this.connectors = [];

    this._registerStartable('connectors', this.connectors);
};

util.inherits(Dispatcher, Starter);

Dispatcher.prototype.registerConnector = function(connector) {
    var self = this;

    self.connectors.push(connector);

    connector.dispatcher = this;
};

Dispatcher.prototype.start = function() {
    this._start();
};

Dispatcher.prototype.registerCall = function(name, callback) {
    var call = {
        name: name,
        callback: callback
    };

    this.registeredCalls[name] = call;
};

Dispatcher.prototype.rpc = function(name, params, options, callback) {
    var connectorsLength = this.connectors.length;
    for (var c = 0; c < connectorsLength; c++) {
        var connector = this.connectors[c];
        connector.rpc(name, params, options, callback);
    }
};

Dispatcher.prototype.processRPC = function(name, params, options, callback) {
    var registeredCalls = this.registeredCalls;
    for (var c in registeredCalls) {
        var registeredCall = registeredCalls[c];
        if (registeredCall.name === name) {
            registeredCall.callback.call({}, params, callback);
        }
    }

    this.emit('_processCall', { name: name, params: params, options: options, callback: callback });
};