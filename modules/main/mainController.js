// top level controller for some global tasks
app.controller('mainController', function($scope, $window) {
    $window.location.href = '#/'; // always redirects to home after refresh

    $scope.$window = $window; // to set route icon visibility
});
