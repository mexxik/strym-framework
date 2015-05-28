var Dispatcher  = require('./dispatcher');
var Config      = require('./config');

var Container = module.exports = function Container(configPath) {
    var self = this;

    self.dispatcher = new Dispatcher();
    self.config = new Config(configPath);

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

Container.prototype.registerConnector = function(connector) {
    this.dispatcher.registerConnector(connector);
};

Container.prototype.registerService = function(service) {
    var self = this;

    service.register(self.dispatcher, self.config);

    self.services.push(service);

    if (typeof service.postRegister === 'function') {
        service.postRegister(self.dispatcher);
    }

    service.getService = function(id) {
        for (var s in self.services) {
            if (self.services[s].id === id) {
                return self.services[s];
            }
        }

        return null;
    };
};

Container.prototype.start = function() {
    this.services.forEach(function(service) {
        if (typeof service.start === 'function') {
            service.start();
        }
    });
};