(function(undefined) {
    'use strict';
    
    var replaceObject = sat.Utils.Object.replace;
    
    sat.SteamAPIThing.directive('offer', [
        'AccountService',
        
        function(accountService) {
            return {
                restrict: 'E',
                transclude: false,
                replace: true,
                scope: {
                    offer: '=info'
                },
                templateUrl: 'views/directives/offer.html',

                controller: function($scope) {
                    $scope.account = [];
                    accountService.getAccountDetails($scope.offer.account, function(account) {
                        $scope.account = replaceObject($scope.account, account);
                    });
                }
            };
        }
    ]);

}).call(this);