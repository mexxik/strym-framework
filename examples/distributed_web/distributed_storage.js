var framework           = require('./../../framework');

var AMQPConnector       = require('./../../lib/connectors/amqp');

var StorageService      = require('./services/storage');


var container = framework.createContainer();

var amqpConnector = new AMQPConnector();
container.registerConnector(amqpConnector);

var storageService = new StorageService();
container.registerService(storageService);

container.start();