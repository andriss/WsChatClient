app.controller('homeController',
  function($scope, homeState, $window, ws, WsConnectionDenied, WsConnectionError, delay) {

    $scope.homeState = homeState;

    $scope.onLogin = function() {

      tryConnect()
      .catch(WsConnectionError, function(e) {
          return retry(e.message); // retry single time
      });
    };

    function tryConnect() {

      homeState.isBtnEnabled = false;
      homeState.isLoading = true;
      $scope.$applyAsync();

      return ws.connect(homeState.userName)
      .then(function(evt) {
        homeState.errorMsg = '';
        homeState.isBtnEnabled = false;
        $window.location.href = '#/chat';
      })
      .catch(WsConnectionDenied, function(e) { // don't retry on this, bad nickname
          homeState.errorMsg = e.message;
          homeState.isBtnEnabled = true;
      })
      .finally(function() {
        homeState.isLoading = false;
        $scope.$apply();
      });
    }

    function retry(errorMsg) {

      homeState.errorMsg = errorMsg + ' Will retry after 5s.';
      homeState.isLoading = false;
      $scope.$apply();

      return delay(5000)
      .then(function() {
        return tryConnect()

        // doesn't matter which one, not gonna retry another time
        .catch(WsConnectionDenied, WsConnectionError, function(e) {
            homeState.errorMsg = e.message;
        })

        .finally(function() {
          homeState.isLoading = false;
          // eventually enable connect button and allow user to retry manually
          homeState.isBtnEnabled = true;
          $scope.$apply();
        });
      });
    }

    ws.events.sub('error', function(evt) {
      homeState.errorMsg = 'Server unavailable.';
      $scope.$apply();
    });

    ws.events.sub('leave', function(evt) {
      homeState.isBtnEnabled = true;
      $scope.$apply();
    });

    ws.events.sub('kick', function(evt) {
      $window.location.href = '#/';
      homeState.isBtnEnabled = true;
      homeState.errorMsg = evt.text;
      $scope.$apply();
    });

    ws.events.sub('down', function(evt) {
      $window.location.href = '#/';
      homeState.isBtnEnabled = true;
      homeState.errorMsg = evt.text;
      $scope.$apply();
    });


});
