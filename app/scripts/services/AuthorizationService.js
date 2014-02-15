(function(window, undefined) {
    'use strict';

    sat.SteamAPIThing.factory('AuthorizationService', [
        '$location',
        
        function($location) {
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
                
                window.location = url;
            }
            
            function getIdentity() {
                return $location.search()[config.identity_param];
            }
            
            return {
                authorize: authorize,
                getIdentity: getIdentity
            };
        }
    ]);
        
}).call(this, window);