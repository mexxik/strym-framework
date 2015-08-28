var framework           = require('./../../framework');

var SocketConnector     = require('./../../lib/connectors/socket');

var WebService          = require('./services/web');
var GeneratorService    = require('./services/generator');


var container = framework.createContainer();
container.createWebServer();

var socketConnector = new SocketConnector();
container.registerConnector(socketConnector);

container.registerService(new GeneratorService());
container.registerService(new WebService());

container.start();
