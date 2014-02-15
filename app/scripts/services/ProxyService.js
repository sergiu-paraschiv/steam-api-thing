(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('ProxyService', [
        '$http',
        
        function($http) {
            var config = sat.Config.SteamAPI;
            
            function get(url, successCallback, errorCallback) {
                var proxiedUrl = config.proxy.replace('{url}', encodeURIComponent(url));
                
                $http.get(proxiedUrl).success(function(response) {
                    if(response.status.http_code === 200) {
                        successCallback.call(undefined, response.contents);
                    }
                    else if(errorCallback) {
                        errorCallback.call(undefined, response.status.http_code);
                    }
                });
            }
            
            return {
                get: get
            };
        }
    ]);
        
}).call(this);