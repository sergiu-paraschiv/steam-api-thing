(function(_, undefined) {
    'use strict';
    
    var AccountsMapper = sat.Mappers.AccountsMapper;
    
    sat.SteamAPIThing.factory('AccountService', [
        'ProxyService',
        'StorageService',
        
        function(proxy, storageService) {
            var config = sat.Config.SteamAPI.authorization;
            var APIconfig = sat.Config.SteamAPI;
            
            var account = new sat.Models.Account();
            
            function getAccount() {
                return account;
            }
            
            function setAccount(newAccount) {
                for(var key in newAccount) {
                    account[key] = newAccount[key];
                }
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
            
            function checkStorage() {
                var storedAccount = storageService.get('account');
                
                setAccount(storedAccount);
                
                return account;
            }
            
            function getAccountDetails(accountId, successCallback) {
                accountId = accountId.toString();
                var url = APIconfig.url + 'ISteamUser/GetPlayerSummaries/v0002/?key=' + APIconfig.key + '&steamids=' + accountId + '&format=json';
                
                proxy.get(
                    url,
                    
                    function(data) {
                        var accounts = new AccountsMapper().map(data.response.players);
                        var account = _.find(accounts, {id: accountId});
                        successCallback.call(undefined, account);
                    },
                    
                    function(code) {
                        //TODO: handle API exceptions
                    }  
                );
            }
            
            checkStorage();
            
            return {
                getAccount: getAccount,
                setAccount: setAccount,
                setAccountId: setAccountId,
                setAccountIdFromIdentity: setAccountIdFromIdentity,
                check: checkStorage,
                getAccountDetails: getAccountDetails
            };
        }
    ]);
        
}).call(this, _);