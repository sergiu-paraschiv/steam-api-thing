(function(Tile, ng, undefined) {
    'use strict';
    
    var replaceArray = sat.Utils.Array.replace;
    var averageRGB = sat.Utils.Image.averageRGB;
    
    sat.SteamAPIThing.directive('game', [
        '$window',
        '$timeout',
        'LeaseService',
        'ProxyService',
        
        function($window, $timeout, leaseService, proxy) {
            return {
                restrict: 'E',
                transclude: false,
                replace: true,
                scope: {
                    game: '=info'
                },
                templateUrl: 'views/directives/game.html',

                controller: function($scope, $element) {
                    var manualFlip = false;

                    Tile($element[0]);
                    
                    $scope.offers = leaseService.getGameOffers($scope.game.id);
                    
                    leaseService.refreshGameOffers($scope.game.id, function(offers) {
                        $scope.offers = replaceArray($scope.offers, offers);
                    });
                    
                    $scope.flip = function() {
                        manualFlip = !manualFlip;
                        $timeout(function() {
                            $element.toggleClass('flipped');
                        }, 200);
                    };
                    
                    $scope.run = function() {
                        $window.open(sat.Config.SteamAPI.runGameUrl + $scope.game.id);
                    };
                    
                    $scope.getBackground = function() {
                        // return proxy.proxiedURL('http://steampowered.com/v/gfx/apps/' + $scope.game.id + '/header_292x136.jpg', true);
                        return 'http://steampowered.com/v/gfx/apps/' + $scope.game.id + '/header_292x136.jpg';
                    };
                    
                    // $scope.rgb = '#FFF';
                    
                    // function getAverageRGB() {
                        // averageRGB(ng.element('img.background', $element), function(rgb) {
                            // $scope.rgb = rgb;
                        // });
                    // };

                    // getAverageRGB();
                    
                    function randomFlipToBack() {
                        $timeout(function() {
                            if(!manualFlip) {
                                $element.addClass('flipped');
                                flipToFront();
                            }
                            else {
                                randomFlipToBack();
                            }
                        }, 30000 + Math.random() * 30000);
                    }
                    
                    function flipToFront() {
                        $timeout(function() {
                            if(!manualFlip) {
                                $element.removeClass('flipped');
                                randomFlipToBack();
                            }
                        }, 5000);
                    }
                    
                    randomFlipToBack();
                }
            };
        }
    ]);

}).call(this, Tile, angular);