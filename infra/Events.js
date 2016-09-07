// pub/sub module
app.factory('Events', function(config) {

  function Events() {

      // list with channels
      var events = {};

      this.pub = function (eventName, args) {
          events[eventName] = events[eventName] || [];

          for (var i = 0; i < events[eventName].length; i++) {
              events[eventName][i](args);
          }
      };

      this.sub = function (eventName, func) {
          events[eventName] = events[eventName] || [];
          events[eventName] = events[eventName] || [];
          events[eventName].push(func);
      };
  }

  return Events;

});
