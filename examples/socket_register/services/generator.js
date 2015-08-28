var framework   = require('./../../../framework');


var GeneratorService = module.exports = function GeneratorService() {

};

framework.inheritService(GeneratorService);

GeneratorService.prototype.postRegister = function() {
    var self = this;

    setInterval(function() {
        self.rpc('valueGenerated', {value: Math.random()});
    }, 1000);
};