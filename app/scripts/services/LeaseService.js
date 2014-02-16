(function(undefined) {
    'use strict';
    
    var LeasesMapper = sat.Mappers.LeasesMapper;
    
    sat.SteamAPIThing.factory('LeaseService', [
        '$http',
        'StorageService',
        
        function($http, storageService) {
            var config = sat.Config.LeaseAPI;
            
            function getGameOffers(gameId) {
                return storageService.get('leases-' + gameId, []);
            }
            
            function refreshGameOffers(gameId, successCallback) {
                var url = config.url + '?gameId=' + gameId;
                
                $http.get(url).success(function(data) {
                    var leases = new LeasesMapper().map(data);
                    storageService.put('leases-' + gameId, leases);
                    successCallback.call(undefined, leases);
                });
            }
            
            function addOffer(gameId, data, successCallback) {
                var url = config.url + '?gameId=' + gameId;
                
                $http.put(url, data).success(function(data) {
                    var leases = new LeasesMapper().map(data);
                    storageService.put('leases-' + gameId, leases);
                    successCallback.call(undefined, leases);
                });
            }
                     
            return {
                refreshGameOffers: refreshGameOffers,
                getGameOffers: getGameOffers,
                addOffer: addOffer
            };
        }
    ]);
        
}).call(this);