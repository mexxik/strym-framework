var framework           = require('./../../framework');

var AMQPConnector       = require('./../../lib/connectors/amqp');

var HttpService         = require('./services/http');


var container = framework.createContainer();

var amqpConnector = new AMQPConnector();
container.registerConnector(amqpConnector);

var httpService = new HttpService();
//var randomService = new RandomService();
container.registerService(httpService);
//container.registerService(randomService);

container.start();