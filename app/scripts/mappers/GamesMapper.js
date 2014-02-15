(function(_, undefined) {
    'use strict';
    
    var Game = sat.Models.Game;
    
    function GamesMapper() {
        
        function mapOne(data) {
            var game = new Game();
            
            game.id = data.appid;
            game.name = data.name;
            game.icon = data.img_icon_url;
            game.logo = data.img_logo_url ;
            game.playTime = data.playtime_forever;
            
            return game;
        }
                
        function map(data) {
            return _.map(data, mapOne);
        }

        return {
            mapOne: mapOne,
            map: map
        };
    }
    
    this.extend('sat.Mappers.GamesMapper', GamesMapper);

}).call(this, _);