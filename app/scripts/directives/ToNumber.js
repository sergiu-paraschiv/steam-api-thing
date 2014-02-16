(function(undefined) {
    'use strict';
    
    /* http://stackoverflow.com/questions/17395188/angular-validate-input-type-number */
    
    sat.SteamAPIThing.directive('toNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function (value) {
                    return parseFloat(value || '');
                });
            }
        };
    });

}).call(this);