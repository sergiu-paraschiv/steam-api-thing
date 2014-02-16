(function(_, undefined) {
    'use strict';
    
    var Account = sat.Models.Account;
    
    function AccountsMapper() {
        
        function mapOne(data) {
            var account = new Account();
            
            account.id = data.steamid;
            account.name = data.personaname;
            account.url = data.profileurl;
            account.avatar = data.avatarfull;
            
            return account;
        }
                
        function map(data) {
            return _.map(data, mapOne);
        }

        return {
            mapOne: mapOne,
            map: map
        };
    }
    
    this.extend('sat.Mappers.AccountsMapper', AccountsMapper);

}).call(this, _);