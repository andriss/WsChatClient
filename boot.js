var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'modules/home/home.html',
            controller  : 'homeController'
        })

        .when('/chat', {
            templateUrl : 'modules/chat/chat.html',
            controller  : 'chatController'
        });
});
