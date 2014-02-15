(function(undefined) {
    'use strict';
    
    var SteamAPI = {
        authorization: {
            url: 'https://steamcommunity.com/openid/login',
            ns: 'http://specs.openid.net/auth/2.0',
            mode: 'checkid_setup',
            return_to: 'http://localhost:9001/#/authresponse',
            realm: 'http://localhost:9001/#/authresponse',
            identity: 'http://specs.openid.net/auth/2.0/identifier_select',
            claimed_id: 'http://specs.openid.net/auth/2.0/identifier_select',
            identity_param: 'openid.identity',
            identity_prefix: 'http://steamcommunity.com/openid/id/'
        },
        
        url: 'http://api.steampowered.com/',
        key: '@@steam_api_key',
        proxy: 'http://localhost:9002/?url={url}'
    };
    
    this.extend('sat.Config.SteamAPI', SteamAPI);
    
}).call(this);