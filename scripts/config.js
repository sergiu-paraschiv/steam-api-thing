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
(function(undefined) {
    'use strict';
    
    var SteamAPI = {
        authorization: {
            url: 'https://steamcommunity.com/openid/login',
            ns: 'http://specs.openid.net/auth/2.0',
            mode: 'checkid_setup',
            return_to: 'http://sergiu-paraschiv.github.io/steam-api-thing/#/authresponse',
            realm: 'http://sergiu-paraschiv.github.io/steam-api-thing/#/authresponse',
            identity: 'http://specs.openid.net/auth/2.0/identifier_select',
            claimed_id: 'http://specs.openid.net/auth/2.0/identifier_select',
            identity_param: 'openid.identity',
            identity_prefix: 'http://steamcommunity.com/openid/id/'
        },
        
        url: 'http://api.steampowered.com/',
        key: 'FF3AB8661A04625ED32A4F37AD6787CD',
        proxy: 'http://steam-api-thing.herokuapp.com/proxy/?url={url}',
        nativeProxy: 'http://steam-api-thing.herokuapp.com/?url={url}&mode=native',
        runGameUrl: 'steam://run/'
    };
    
    this.extend('sat.Config.SteamAPI', SteamAPI);
    
}).call(this);
(function(undefined) {
    'use strict';
    
    var LeaseAPI = {
        url: 'http://steam-api-thing.herokuapp.com/lease/'
    };
    
    this.extend('sat.Config.LeaseAPI', LeaseAPI);
    
}).call(this);