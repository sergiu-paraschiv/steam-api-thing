(function(undefined) {
    'use strict';
    
    function Game() {
        this.id = null;
        this.name = null;
        this.icon = null;
        this.logo = null;
        this.playTime = null;
    }
    
    this.extend('sat.Models.Game', Game);

}).call(this);