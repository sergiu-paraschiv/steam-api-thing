(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('ProxyService', [
        '$http',
        
        function($http) {
            var config = sat.Config.SteamAPI;
            
            function proxiedURL(url, isNative) {
                var newURL = config.proxy;
                if(isNative) {
                    newURL = config.nativeProxy;
                }
                
                return newURL.replace('{url}', encodeURIComponent(url));
            }
            
            function get(url, successCallback, errorCallback) {
                $http.get(proxiedURL(url)).success(function(response) {
                    if(response.status.http_code === 200) {
                        successCallback.call(undefined, response.contents);
                    }
                    else if(errorCallback) {
                        errorCallback.call(undefined, response.status.http_code);
                    }
                });
            }
            
            return {
                get: get,
                proxiedURL: proxiedURL
            };
        }
    ]);
        
}).call(this);