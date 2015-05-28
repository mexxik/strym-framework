var Service = module.exports = function Service() {

};

Service.prototype.register = function(dispatcher, config) {
    this.dispatcher = dispatcher;
    this.config = config;
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
    if (this.config) {
        return this.config.get(path);
    }
    return undefined;
};