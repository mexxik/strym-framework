var events      = require('events');
var util        = require('util');


var Starter = module.exports = function Starter() {

};

util.inherits(Starter, events.EventEmitter);

Starter.prototype._registerStartable = function(name, startable) {
    if (typeof this._startableGroups !== 'object') {
        this._startableGroups = {};
    }

    this._startableGroups[name] = startable;
};

Starter.prototype._start = function() {
    this._groupStarted = {};

    if (typeof this._startableGroups === 'object') {
        for (var name in this._startableGroups) {
            this._groupStarted[name] = false;

            var group = this._startableGroups[name];
            this._processGroup(group);
        }
    }
};

Starter.prototype._processGroup = function(group) {
    var self = this;
    var groupSize = group.length;
    for (var s = 0; s < groupSize; s++) {
        var startable = group[s];
        if (typeof startable.start === 'function') {
            startable.start(function() {
                startable.started = true;

                self._check();
            });
        }
    }
};

Starter.prototype._startablesCount = function() {
    var count = 0;

    for (var g in this._startableGroups) {
        var group = this._startableGroups[g];
        count += group.length;
    }

    return count;
};

Starter.prototype._check = function() {
    var startablesCount = this._startablesCount();

    for (var g in this._startableGroups) {
        var group = this._startableGroups[g];
        group.forEach(function(startable) {
            if (startable.started) {
                startablesCount--;
            }
        });
    };

    if (startablesCount === 0) {
        this._started();
    }
};

Starter.prototype._started = function() {
    this.emit('started');
};