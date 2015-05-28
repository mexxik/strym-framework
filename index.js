var Container = require('./lib/container');

module.exports = {
    createContainer: function(configPath) {
        var container = new Container(configPath);
        return container;
    }
};