(function(undefined) {
    'use strict';
    
    function replaceArray(a, b) {
        a.splice(0, a.length);
        return a.concat(b);
    }
    
    this.extend('sat.Utils.Array.replace', replaceArray);

}).call(this);