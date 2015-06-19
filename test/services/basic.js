var util        = require('util');

var Service     = require('./../../lib/basic/service');



var BasicService = module.exports = function BasicService() {
    this.name = 'basicService';
};

util.inherits(BasicService, Service);

BasicService.prototype.postRegister = function() {

};

BasicService.prototype.start = function(callback) {
    callback();
};