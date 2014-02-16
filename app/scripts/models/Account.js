(function(undefined) {
    'use strict';
    
    function Account(id) {
        this.id = id || null;
        this.name = null;
        this.url = null;
        this.avatar = null;
    }
    
    this.extend('sat.Models.Account', Account);

}).call(this);