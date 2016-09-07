// Error class, when server is unreachable 
app.factory('WsConnectionError', function() {

  function WsConnectionError(message) {
      this.name = 'WsConnectionError';
      this.message = message || 'Default Message';
      this.stack = (new Error()).stack;
  }
  WsConnectionError.prototype = Object.create(Error.prototype);
  WsConnectionError.prototype.constructor = WsConnectionError;

  return WsConnectionError;

});
