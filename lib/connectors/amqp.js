var util        = require('util');

var Connector     = require('./connector');


var AMQPConnector = module.exports = function InternalConnector() {

};

util.inherits(AMQPConnector, Connector);

AMQPConnector.prototype.call = function(name, params, options, callback) {
    //this.dispatcher.processCall(name, params, options, callback);

    /*var registeredCalls = this.dispatcher.registeredCalls;
     for (var c in registeredCalls) {
     var registeredCall = registeredCalls[c];
     if (registeredCall.name === name) {
     registeredCall.callback.call({}, params, callback);
     }
     }*/
};