(function(undefined) {
    'use strict';
    
    this.sat.SteamAPIThing.controller('GamesListController', [
        '$scope',
        'AccountService',
        'GamesService',
        
        function($scope, accountService, gamesService) {
            var account = accountService.getAccount();
            
            $scope.games = [];
            
            gamesService.getOwnedGames(account.id, function(games) {

                $scope.games.splice(0, $scope.games.length);
                $scope.games = $scope.games.concat(games);
            });
        }
    ]);
        
}).call(this);