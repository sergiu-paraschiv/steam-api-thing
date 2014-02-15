(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('AccountService', [

        function() {
            var config = sat.Config.SteamAPI.authorization;
            
            var account = new sat.Models.Account();
            
            function getAccount() {
                return account;
            }
            
            function setAccountId(newId) {
                account.id = newId;
            }
            
            function parseIdentity(identity) {
                return identity.replace(config.identity_prefix, '');
            }
            
            function setAccountIdFromIdentity(identity) {
                account.id = parseIdentity(identity);
            }
            
            return {
                getAccount: getAccount,
                setAccountId: setAccountId,
                setAccountIdFromIdentity: setAccountIdFromIdentity
            };
        }
    ]);
        
}).call(this);