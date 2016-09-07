// Error class, when server is reachable, but if actively refusing connection (bad nickname) 
app.factory('WsConnectionDenied', function() {

  // server is working, but refuses to connect (wrong usename)
  function WsConnectionDenied(message) {
      this.name = 'WsConnectionDenied';
      this.message = message || 'Default Message';
      this.stack = (new Error()).stack;
  }
  WsConnectionDenied.prototype = Object.create(Error.prototype);
  WsConnectionDenied.prototype.constructor = WsConnectionDenied;

  return WsConnectionDenied;

});
