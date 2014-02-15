(function(undefined) {
    'use strict';
    
    this.sat.SteamAPIThing.controller('AuthorizationResponseController', [
        '$scope',
        '$location',
        'AuthorizationService',
        'AccountService',
        
        function($scope, $location, authorizationService, accountService) {
            var identity = authorizationService.getIdentity();
            accountService.setAccountIdFromIdentity(identity);
            $location.url('/games').replace();
        }
    ]);
        
}).call(this);