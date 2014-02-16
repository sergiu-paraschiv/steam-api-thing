(function(_, undefined) {
    'use strict';
    
    var GamesMapper = sat.Mappers.GamesMapper;
    var GameDetails = sat.Models.GameDetails;
    
    sat.SteamAPIThing.factory('GamesService', [
        'ProxyService',
        'StorageService',
        
        function(proxy, storageService) {
            var config = sat.Config.SteamAPI;
            
            function refreshOwnedGames(accountId, successCallback) {
                var url = config.url + 'IPlayerService/GetOwnedGames/v0001/?key=' + config.key + '&steamid=' + accountId + '&include_appinfo=1&format=json';
                
                proxy.get(
                    url,
                    
                    function(data) {
                        var games = new GamesMapper().map(data.response.games);
                        storageService.put('ownedGames', games);
                        successCallback.call(undefined, games);
                    },
                    
                    function(code) {
                        //TODO: handle API exceptions
                    }
                );
            }
            
            function getOwnedGames() {
                return storageService.get('ownedGames', []);
            }
            
            function getGameById(gameId) {
                var ownedGames = storageService.get('ownedGames', []);
                return _.find(ownedGames, {id: gameId});
            }

            return {
                refreshOwnedGames: refreshOwnedGames,
                getOwnedGames: getOwnedGames,
                getGameById: getGameById
            };
        }
    ]);
        
}).call(this, _);