var events      = require('events');
var util        = require('util');


var Dispatcher = module.exports = function Dispatcher() {
    this.registeredCalls = {};
    this.connectors = [];
};

util.inherits(Dispatcher, events.EventEmitter);

Dispatcher.prototype.registerConnector = function(connector) {
    var self = this;

    self.connectors.push(connector);

    connector.dispatcher = this;
};

Dispatcher.prototype.registerCall = function(name, callback) {
    var call = {
        name: name,
        callback: callback
    };

    this.registeredCalls[name] = call;
};

Dispatcher.prototype.call = function(name, params, options, callback) {
    var connectorsLength = this.connectors.length;
    for (var c = 0; c < connectorsLength; c++) {
        var connector = this.connectors[c];
        connector.call(name, params, options, callback);
    }
};

Dispatcher.prototype.processCall = function(name, params, options, callback) {
    var registeredCalls = this.registeredCalls;
    for (var c in registeredCalls) {
        var registeredCall = registeredCalls[c];
        if (registeredCall.name === name) {
            registeredCall.callback.call({}, params, callback);
        }
    }

    this.emit('_processCall', { name: name, params: params, options: options, callback: callback });
};