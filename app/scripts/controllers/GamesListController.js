(function(undefined) {
    'use strict';
    
    var replaceArray = sat.Utils.Array.replace;
    
    sat.SteamAPIThing.controller('GamesListController', [
        '$scope',
        'TitleService',
        'AccountService',
        'GamesService',
        'LeaseService',

        function($scope, titleService, accountService, gamesService, leaseService) {
            titleService.set([sat.Config.pageTitles.myGames]);
            
            $scope.games = gamesService.getOwnedGames();
           
            gamesService.refreshOwnedGames(accountService.getAccount().id, function(games) {
                $scope.games = replaceArray($scope.games, games);
            });
            
            $scope.activeOffers = function(game) {
                var offers = leaseService.getGameOffers(game.id);
                
                if(offers.length > 0) {
                    return true;
                }
                
                return false;
            };
            
            $scope.noActiveOffers = function(game) {
                return !$scope.activeOffers(game);
            };
            
            $scope.playTime = function(game) {
                return 1 / parseFloat(game.playTime);
            };
        }
    ]);
        
}).call(this);