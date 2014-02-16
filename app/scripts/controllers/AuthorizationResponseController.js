(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('AuthorizationResponseController', [
        '$scope',
        '$location',
        'AuthorizationService',
        'AccountService',
        'StorageService',
        
        function($scope, $location, authorizationService, accountService, storageService) {
            function getIdentity() {
                var config = sat.Config.SteamAPI.authorization;
                
                return $location.search()[config.identity_param];
            }
            
            var identity = getIdentity();
            
            if(identity) {
                accountService.setAccountIdFromIdentity(identity);
                
                storageService.put('account', accountService.getAccount());
                
                $location.url('/games').replace();
            }
            else {
                //TODO: handle Steam OpenID authorization error
            }
        }
    ]);
        
}).call(this);