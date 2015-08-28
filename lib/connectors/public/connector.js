var Connector = (function(){
    var Connector = function Connector() {
        var self = this;
        self.socket = io('');
        self.rpcs = {};

        this.socket.on('_rpcResponse', function(data) {
            var callData = self.rpcs[data.correlationId];
            if (callData) {
                callData.callback.call({}, data.response);

                self.rpcs[data.correlationId] = null;
                delete self.rpcs[data.correlationId];
            }
        });
    };

    Connector.prototype.rpc = function(name, params, options, callback) {
        var correlationId = 234;

        var rpcData = {
            name: name,
            params: params,
            options: options,
            callback: callback
        };

        this.rpcs[correlationId] = rpcData;

        this.socket.emit('_rpcRequest', {
            name: name,
            params: params,
            options: options,
            correlationId: correlationId
        });
    };

    return Connector;
}());