var fs          = require('fs');

var Config = module.exports = function Config(path) {
    this.path = path;

    if (this.path) {
        this._config = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    }
    else {
        this._config = {};
    }
};

Config.prototype.get = function(path, defaultValue) {
    function getObject(object, path, defaultValue) {
        var i;
        var length;
        for (i = 0, path = path.split('.'), length = path.length; i < length; i++) {
            if (!object || typeof object !== 'object') {
                return defaultValue;
            }

            object = object[path[i]];
        }

        if (object === undefined) {
            return defaultValue;
        }

        return object;
    }

    return getObject(this._config, path, defaultValue);
};