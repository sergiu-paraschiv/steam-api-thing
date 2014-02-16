(function(undefined) {
    'use strict';
    
    var Config = {
        pageTitles: {
            base: 'Steam App Thing',
            separator: ' | ',
            
            authorization: 'Sign In',
            myGames: 'My Games',
            gameLeases: 'Offers for "{name}"',
            addGameLease: 'Add offer for "{name}"'
        }
    };
    
    this.extend('sat.Config', Config);
    
}).call(this);