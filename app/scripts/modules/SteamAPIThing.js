(function(ng, undefined) {
    'use strict';
   
    var module = ng.module('SteamAPIThing', [
        'ngRoute'
    ]);
    
    module.config([
        '$routeProvider',
        '$locationProvider',
        '$httpProvider',
        
        function($routeProvider, $locationProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/authorize.html',
                    controller: 'AuthorizationController'
                })
                .when('/authresponse', {
                    templateUrl: 'views/authorize.html',
                    controller: 'AuthorizationResponseController'
                })
                .when('/games', {
                    templateUrl: 'views/games.html',
                    controller: 'GamesListController'
                })
                .otherwise({
                    redirectTo: '/'
                });
                
            // $locationProvider.html5Mode(true);
            
            $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ]);

    this.extend('sat.SteamAPIThing', module);
    
}).call(this, angular);