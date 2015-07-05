var Connector = (function(){
    var Connector = function Connector() {
        var self = this;
        self.socket = io('');
        self.calls = {};

        this.socket.on('_callResponse', function(data) {
            var callData = self.calls[data.correlationId];
            if (callData) {
                callData.callback.call({}, data.response);

                self.calls[data.correlationId] = null;
                delete self.calls[data.correlationId];
            }
        });
    };

    Connector.prototype.call = function(name, params, options, callback) {
        var correlationId = 234;

        var callData = {
            name: name,
            params: params,
            options: options,
            callback: callback
        };

        this.calls[correlationId] = callData;

        this.socket.emit('_callRequest', {
            name: name,
            params: params,
            options: options,
            correlationId: correlationId
        });
    };

    return Connector;
}());