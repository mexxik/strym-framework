var fs          = require('fs');

var Properties = module.exports = function Properties(path) {
    this.path = path;

    if (this.path) {
        this._properties = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    }
    else {
        this._properties = {};
    }
};

Properties.prototype.get = function(path, defaultValue) {
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

    return getObject(this._properties, path, defaultValue);
};