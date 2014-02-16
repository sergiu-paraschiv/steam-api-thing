(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('AddGameLeaseOfferController', [
        '$scope',
        '$routeParams',
        '$location',
        'TitleService',
        'AccountService',
        'GamesService',
        'LeaseService',

        function($scope, $routeParams, $location, titleService, accountService, gamesService, leaseService) {
            var gameId = parseInt($routeParams.gameId);
            
            $scope.game = gamesService.getGameById(gameId);
            
            titleService.set([sat.Config.pageTitles.addGameLease.replace('{name}', $scope.game.name)]);
            
            $scope.description = '';
            $scope.amount = 0;
            
            $scope.add = function() {
                var data = {
                    description: $scope.description,
                    amount: $scope.amount,
                    account: accountService.getAccount().id
                };
                
                leaseService.addOffer(gameId, data, function() {
                    $location.url('/games').replace();
                });
            };
        }
    ]);
        
}).call(this);