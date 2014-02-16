(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('StorageService', [
        '$rootScope',
        '$localStorage',
        
        function($rootScope, $localStorage) {
            $rootScope.$storage = $localStorage.$default({
                account: undefined,
                ownedGames: []
            });
            
            function get(key, def) {
                if($rootScope.$storage[key]) {
                    return $rootScope.$storage[key];
                }
                
                if(!def) {
                    def = undefined;
                }
                
                return def;
            }
            
            function put(key, value) {
                $rootScope.$storage[key] = value;
            }
            
            function flush() {
                $localStorage.$reset();
            }
            
            return {
                get: get,
                put: put,
                flush: flush
            };
        }
    ]);
        
}).call(this);