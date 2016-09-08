  app.controller('chatController', function($scope, chatState, $window, ws) {

      $scope.receivedData = ws.receivedData;
      $scope.chatState = chatState;

      ws.events.sub('msg', function() {
        $scope.$apply(); // refresh list from receivedData
      });

      $scope.onSend = function(evt) {
        ws.send(chatState.message);
        chatState.message = '';
      };

      $scope.onDisconnect = function() {
        ws.leave();
        $window.location.href = '#/';
      };

      $scope.isConnected = function() {
          return ws.isConnected();
      };

      // leave chat when browser closes
      $window.onbeforeunload = function() {
       ws.leave();
     };
  });
