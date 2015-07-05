var framework           = require('./../../framework');

var SocketConnector     = require('./../../lib/connectors/socket');

var WebService          = require('./services/web');
var StorageService      = require('./services/storage');


var container = framework.createContainer();
container.createWebServer();

var socketConnector = new SocketConnector();
container.registerConnector(socketConnector);

container.registerService(new StorageService());
container.registerService(new WebService());

container.start();
