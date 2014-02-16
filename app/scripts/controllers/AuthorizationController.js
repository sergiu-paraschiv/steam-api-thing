(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('AuthorizationController', [
        '$scope',
        '$location',
        'TitleService',
        'AccountService',
        'AuthorizationService',
        
        function($scope, $location, titleService, accountService, authorizationService) {
            titleService.set([sat.Config.pageTitles.authorization]);
            
            var account = accountService.check();
            
            if(account.id) {
                $location.url('/games').replace();
            }
            
            $scope.authorize = function() {
                authorizationService.authorize();
            };
        }
    ]);
        
}).call(this);