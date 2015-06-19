'use strict';

var util        = require('util');

var Container   = require('./lib/container');
var Service     = require('./lib/basic/service');

module.exports = {
    createContainer: function(propertiesPath) {
        var container = new Container(propertiesPath);
        return container;
    },
    inheritService: function(childService) {
        util.inherits(childService, Service);
    }
};