(function(ng, undefined) {
    'use strict';
   
    var module = ng.module('SteamAPIThing', [
        'ngRoute',
        'ngStorage'
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
                .when('/signout', {
                    templateUrl: 'views/authorize.html',
                    controller: 'SignOutController'
                })
                .when('/games', {
                    templateUrl: 'views/games.html',
                    controller: 'GamesListController'
                })
                .when('/add-offer/:gameId', {
                    templateUrl: 'views/addoffer.html',
                    controller: 'AddGameLeaseOfferController'
                })
                .when('/game/:gameId/offers', {
                    templateUrl: 'views/offers.html',
                    controller: 'GameLeaseOffersController'
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