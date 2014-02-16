(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('GameLeaseOffersController', [
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
            
            titleService.set([sat.Config.pageTitles.gameLeases.replace('{name}', $scope.game.name)]);
            
            $scope.offers = leaseService.getGameOffers(gameId);
            
            $scope.offerAmount = function(offer) {
                return parseFloat(offer.amount);
            };
        }
    ]);
        
}).call(this);