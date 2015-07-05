var framework   = require('./../../../framework');


var StorageService = module.exports = function StorageService() {

};

framework.inheritService(StorageService);

StorageService.prototype.getRandomNumber = function(params, callback) {
    callback(Math.random());
};