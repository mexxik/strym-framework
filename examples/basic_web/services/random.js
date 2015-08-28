var http        = require('http');

var framework   = require('./../../../framework');


var RandomService = module.exports = function RandomService() {

};

framework.inheritService(RandomService);

RandomService.prototype.getRandomNumber = function(params, callback) {
    callback('hello world!');
};