(function(_, undefined) {
    'use strict';
    
    var Lease = sat.Models.Lease;
    
    function LeasesMapper() {
        
        function mapOne(data) {
            var lease = new Lease();
            
            lease.description = data.description;
            lease.amount = data.amount;
            lease.account = data.account;
            
            return lease;
        }
                
        function map(data) {
            return _.map(data, mapOne);
        }

        return {
            mapOne: mapOne,
            map: map
        };
    }
    
    this.extend('sat.Mappers.LeasesMapper', LeasesMapper);

}).call(this, _);