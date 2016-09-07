app.factory('ws', function(config, Events, WsConnectionDenied, WsConnectionError) {

  var ws = null;
  var receivedData = [];
  var events = new Events();

  function connect(userName) {

    return new Promise(function (resolve, reject) {

      // Should wait no longer than 3 seconds to establish a connection
      var timer = setTimeout(function() {
        ws.close();
        reject(new WsConnectionError('Could not establish connection in 3s'));
      }, 3000);

      // userName is included in connection url to save roundtrip and make process easier
      // http://stackoverflow.com/questions/19461534/websocket-send-extra-information-on-connection
      ws = new WebSocket(config.wsServerUrl + '?' + userName, 'protocolOne');

      ws.onopen = function() {
        clearTimeout(timer);
      };

      // specific onmessage for login purposes
      // will be overridden later
      ws.onmessage = function(event) {
        var data = JSON.parse(event.data);

        // this message will not be broadcasted but only send to succesfully logged in client
        // because of that, each client will only receive single 'connect-succ' per session
        if (data.subType === 'connect-succ') {
          resolve(data);
        }
        if (data.subType === 'connect-fail') {
          ws.close();
          reject(new WsConnectionDenied(data.text));
        }
      };

      ws.onerror = function(event) {
        reject(new WsConnectionError('Server unavailable.'));
      };


    }).then(function() {

      handleMessages();
      handleErrors();
      handleClose();

    });
  }

  // returns to normal message handling by overriding specific login .onmessage
  function handleMessages() {
    ws.onmessage = function(event) {

      var data = JSON.parse(event.data);
      receivedData.push(data);

      if (data.type === 'srv' && data.subType === 'kick') {
        clearReceived();
        events.pub('kick', data);
      }
      else if (data.type === 'srv' && data.subType === 'down') {
        clearReceived();
        events.pub('down', data);
      }
      else {
        events.pub('msg', data);
      }
    };
  }

  function handleErrors() {
    ws.onerror = function(event) {
      events.pub('error', event);
    };
  }

  function handleClose() {
    ws.onclose = function(evt) {
      clearReceived();
    }
  }

  function clearReceived() {
    while (receivedData.length) { receivedData.pop(); } // because need to keep reference of this external variable
  }

  function send(txt) {
    ws.send(JSON.stringify({type: 'send', text: txt }));
  }

  function leave() {
    ws.send(JSON.stringify({ type: 'leave' }));
    events.pub('leave');
  }

  function isConnected() {
    return !!(ws && ws.readyState === 1);
  }

  return {
    connect: connect,
    send: send,
    leave: leave,

    receivedData: receivedData,
    isConnected: isConnected,

    events: events
  };

});
