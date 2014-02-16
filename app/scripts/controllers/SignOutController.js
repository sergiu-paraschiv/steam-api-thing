(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('SignOutController', [
        '$scope',
        '$location',
        'AccountService',
        'StorageService',
        
        function($scope, $location, accountService, storageService) {
            storageService.flush();
            accountService.setAccount(new sat.Models.Account());
            
            $location.url('/').replace();
        }
    ]);
        
}).call(this);