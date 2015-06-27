var util        = require('util');

var http        = require('http');

var uuid        = require('node-uuid');

var Starter     = require('./basic/starter');

var Dispatcher  = require('./dispatcher');
var Properties  = require('./properties');

var Container = module.exports = function Container(propertiesPath) {
    var self = this;

    self.privateStartedDispatch = true;

    self.dispatcher = new Dispatcher();
    self.properties = new Properties(propertiesPath);

    self.services = [];
    self._registerStartable('services', self.services);

    self.on('_started', function() {
        self.servicesStarted = true;
        self._checkIfAllStarted();
    });

    self.dispatcher.on('started', function() {
        self.connectorsStarted = true;
        self._checkIfAllStarted();
    });

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

util.inherits(Container, Starter);

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

Container.prototype.createWebServer = function(serverConfig) {
    var self = this;

    self.webServer = http.createServer(function(req, res) {
        self._processWebRequest(req, res);
    });

    self.webServer.listen(1609, '127.0.0.1');
};

Container.prototype._processWebRequest = function(req, res) {
    var callbackName = 'webRequest';
    var servicesLength = this.services.length;
    for (var s = 0; s < servicesLength; s++) {
        var service = this.services[s];
        if (typeof service[callbackName] === 'function') {
            service[callbackName].call(service, req, res);
        }
    }
};

Container.prototype.start = function() {
    this._start();
    this.dispatcher.start();
};

Container.prototype.stop = function(callback) {
    //this._stop();
    //this.
};

Container.prototype._checkIfAllStarted = function() {
    if (this.servicesStarted && this.connectorsStarted) {
        this.emit('started');
    }
};