var framework           = require('./../../framework');

var WebService         = require('./services/web');


var container = framework.createContainer();
container.createWebServer();

var webService = new WebService();
container.registerService(webService);

container.start();
