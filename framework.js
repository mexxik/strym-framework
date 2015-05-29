'use strict';

var util        = require('util');

var Container   = require('./lib/container');
var Service     = require('./lib/service');

module.exports = {
    createContainer: function(configPath) {
        var container = new Container(configPath);
        return container;
    },
    inheritService: function(childService) {
        util.inherits(childService, Service);
    }
};