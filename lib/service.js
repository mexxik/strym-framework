var Service = module.exports = function Service() {
    this.id = '';
    this.registered = false;
    this.started = false;
};

Service.prototype.register = function(dispatcher, properties) {
    this.dispatcher = dispatcher;
    this.properties = properties;
};

Service.prototype.dispatch = function(name, params) {
    this.dispatcher.emit(name, params);
};

Service.prototype.listen = function(name, callback) {
    this.dispatcher.on(name, callback);
};

Service.prototype.registerCall = function(name, callback) {
    this.dispatcher.registerCall(name, callback);
};

Service.prototype.call = function(name, params, options, callback) {
    this.dispatcher.call(name, params, options, callback);
};

Service.prototype.getProperty = function(path) {
    if (this.properties) {
        return this.properties.get(path);
    }
    return null;
};