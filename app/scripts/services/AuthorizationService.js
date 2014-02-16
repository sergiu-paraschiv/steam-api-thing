(function(undefined) {
    'use strict';

    sat.SteamAPIThing.factory('AuthorizationService', [
        '$window',
        
        function($window) {
            var config = sat.Config.SteamAPI.authorization;
            
            function authorizationURL() {
                var params = [
                    'openid.ns=' + encodeURIComponent(config.ns),
                    'openid.mode=' + encodeURIComponent(config.mode),
                    'openid.return_to=' + encodeURIComponent(config.return_to),
                    'openid.realm=' + encodeURIComponent(config.realm),
                    'openid.identity=' + encodeURIComponent(config.identity),
                    'openid.claimed_id=' + encodeURIComponent(config.claimed_id)
                ];
                
                var url = config.url + '?' + params.join('&');
                
                return url;
            }
        
            function authorize() {
                var url = authorizationURL();
                
                $window.location = url;
            }
            
            return {
                authorize: authorize
            };
        }
    ]);
        
}).call(this);