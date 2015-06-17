var events      = require('events');
var util        = require('util');

var uuid        = require('node-uuid');

var Dispatcher  = require('./dispatcher');
var Properties  = require('./properties');

var Container = module.exports = function Container(propertiesPath) {
    var self = this;

    self.dispatcher = new Dispatcher();
    self.properties = new Properties(propertiesPath);

    self.services = [];

    self.dispatcher.on('_processCall', function(callParams) {
        var servicesLength = self.services.length;
        for (var s = 0; s < servicesLength; s++) {
            var service = self.services[s];
            if (typeof service[callParams.name] === 'function') {
                service[callParams.name].call(service, callParams.params, callParams.callback);
            }
        }
    });
};

util.inherits(Container, events.EventEmitter);

Container.prototype.registerConnector = function(connector) {
    this.dispatcher.registerConnector(connector);
};

Container.prototype.registerService = function(service) {
    var self = this;

    service.id = uuid.v4();
    service.register(self.dispatcher, self.properties);

    self.services.push(service);
    service.registered = true;

    if (typeof service.postRegister === 'function') {
        service.postRegister(self.dispatcher);
    }

    service.getService = function(name) {
        for (var s in self.services) {
            if (self.services[s].name === name) {
                return self.services[s];
            }
        }

        return null;
    };
};

Container.prototype.start = function() {
    var self = this;

    self.services.forEach(function(service) {
        if (typeof service.start === 'function') {
            service.start(function() {
                service.started = true;

                if (self._checkIfAllServicesStarted()) {
                    self.emit('started');
                }
            });
        }
    });
};

Container.prototype._checkIfAllServicesStarted = function() {
    var servicesCount = this.services.length;

    this.services.forEach(function(service) {
        if (service.started) {
            servicesCount--;
        }
    });

    return servicesCount === 0 ? true : false;
};