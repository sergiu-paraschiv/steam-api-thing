(function(undefined) {
    'use strict';
    
    var GamesMapper = sat.Mappers.GamesMapper;
    
    sat.SteamAPIThing.factory('GamesService', [
        'ProxyService',
        
        function(proxy) {
            var config = sat.Config.SteamAPI;
            
            function getOwnedGames(accountId, successCallback) {
                var url = config.url + 'IPlayerService/GetOwnedGames/v0001/?key=' + config.key + '&steamid=' + accountId + '&include_appinfo=1&format=json';
                
                proxy.get(
                    url,
                    
                    function(data) {
                        successCallback.call(undefined, GamesMapper().map(data.response.games));
                    },
                    
                    function(code) {
                        //TODO: handle API exceptions
                    }  
                );
            }
            
            return {
                getOwnedGames: getOwnedGames
            };
        }
    ]);
        
}).call(this);