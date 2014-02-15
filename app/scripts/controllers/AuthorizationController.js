(function(undefined) {
    'use strict';
    
    this.sat.SteamAPIThing.controller('AuthorizationController', [
        '$scope',
        'AuthorizationService',
        
        function($scope, authorizationService) {
            $scope.authorize = function() {
                authorizationService.authorize();
            };
        }
    ]);
        
}).call(this);