// wrapper to simplify timeouts with Promises
app.factory('delay', function() {

  var delay = function (ms) {
    return new Promise(function (resolve, reject) {
      setTimeout(function() { resolve(); }, ms);
    });
  };

  return delay;

});
