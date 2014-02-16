(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('TitleService', [
        '$rootScope',
        
        function($rootScope) {
            var config = sat.Config.pageTitles;
            
            function set(titleParts) {
                var parts = [config.base];
                parts = parts.concat(titleParts);
                
                $rootScope.title = parts.join(config.separator);
            }
            
            return {
                set: set
            };
        }
    ]);
        
}).call(this);