(function(undefined) {
    'use strict';
    
    function replaceObject(a, b) {
        for(var key in b) {
            a[key] = b[key];
        }
        return a;
    }
    
    this.extend('sat.Utils.Object.replace', replaceObject);

}).call(this);