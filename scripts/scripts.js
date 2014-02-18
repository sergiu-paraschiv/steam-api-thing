(function(undefined) {
    'use strict';
    
    function replaceArray(a, b) {
        a.splice(0, a.length);
        return a.concat(b);
    }
    
    this.extend('sat.Utils.Array.replace', replaceArray);

}).call(this);
(function(undefined) {
    'use strict';
    
    function replaceObject(a, b) {
        for(var key in b) {
            a[key] = b[key];
        }
        return a;
    }
    
    this.extend('sat.Utils.Object.replace', replaceObject);

}).call(this);
(function(document, undefined) {
    'use strict';
    
    function averageRGB(elem, callback) {
        elem.bind('load', function() {
            var externalImage2 = new Image();
            externalImage2.onload = function() {
                console.log('load');
                var rgb = getAverageRGB(externalImage2);
                console.log(rgb);
                callback.call(undefined, rgb);
            };
            externalImage2.crossOrigin = 'Anonymous';
            externalImage2.src = elem[0].src;
            
        });
        
        
    }
    
    function getAverageRGB(imgEl) {
        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }

        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        return rgb;
    }
    
    this.extend('sat.Utils.Image.averageRGB', averageRGB);

}).call(this, document);
(function(ng, undefined) {
    'use strict';
   
    var module = ng.module('SteamAPIThing', [
        'ngRoute',
        'ngStorage'
    ]);
    
    module.config([
        '$routeProvider',
        '$locationProvider',
        '$httpProvider',
        
        function($routeProvider, $locationProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/authorize.html',
                    controller: 'AuthorizationController'
                })
                .when('/authresponse', {
                    templateUrl: 'views/authorize.html',
                    controller: 'AuthorizationResponseController'
                })
                .when('/signout', {
                    templateUrl: 'views/authorize.html',
                    controller: 'SignOutController'
                })
                .when('/games', {
                    templateUrl: 'views/games.html',
                    controller: 'GamesListController'
                })
                .when('/add-offer/:gameId', {
                    templateUrl: 'views/addoffer.html',
                    controller: 'AddGameLeaseOfferController'
                })
                .when('/game/:gameId/offers', {
                    templateUrl: 'views/offers.html',
                    controller: 'GameLeaseOffersController'
                })
                .otherwise({
                    redirectTo: '/'
                });
                
            // $locationProvider.html5Mode(true);
            
            $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        }
    ]);

    this.extend('sat.SteamAPIThing', module);
    
}).call(this, angular);
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
(function(undefined) {
    'use strict';
    
    function Game() {
        this.id = null;
        this.name = null;
        this.icon = null;
        this.logo = null;
        this.playTime = null;
    }
    
    this.extend('sat.Models.Game', Game);

}).call(this);
(function(undefined) {
    'use strict';
    
    function Lease() {
        this.description = '';
        this.amount = 0;
    }
    
    this.extend('sat.Models.Lease', Lease);

}).call(this);
(function(undefined) {
    'use strict';
    
    function GameDetails() {
        this.gameId = null;
        this.offers = [];
    }
    
    this.extend('sat.Models.GameDetails', GameDetails);

}).call(this);
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
(function(_, undefined) {
    'use strict';
    
    var Game = sat.Models.Game;
    
    function GamesMapper() {
        
        function mapOne(data) {
            var game = new Game();
            
            game.id = data.appid;
            game.name = data.name;
            game.icon = data.img_icon_url;
            game.logo = data.img_logo_url;
            game.playTime = data.playtime_forever;
            
            return game;
        }
                
        function map(data) {
            data = _.filter(data, 'img_logo_url');
            
            return _.map(data, mapOne);
        }

        return {
            mapOne: mapOne,
            map: map
        };
    }
    
    this.extend('sat.Mappers.GamesMapper', GamesMapper);

}).call(this, _);
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
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('TitleService', [
        '$rootScope',
        
        function($rootScope) {
            var config = sat.Config.pageTitles;
            
            function set(titleParts) {
                var parts = [config.base];
                parts = parts.concat(titleParts);
                
                $rootScope.title = parts.join(config.separator);
            }
            
            return {
                set: set
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('StorageService', [
        '$rootScope',
        '$localStorage',
        
        function($rootScope, $localStorage) {
            $rootScope.$storage = $localStorage.$default({
                account: undefined,
                ownedGames: []
            });
            
            function get(key, def) {
                if($rootScope.$storage[key]) {
                    return $rootScope.$storage[key];
                }
                
                if(!def) {
                    def = undefined;
                }
                
                return def;
            }
            
            function put(key, value) {
                $rootScope.$storage[key] = value;
            }
            
            function flush() {
                $localStorage.$reset();
            }
            
            return {
                get: get,
                put: put,
                flush: flush
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.factory('ProxyService', [
        '$http',
        
        function($http) {
            var config = sat.Config.SteamAPI;
            
            function proxiedURL(url, isNative) {
                var newURL = config.proxy;
                if(isNative) {
                    newURL = config.nativeProxy;
                }
                
                return newURL.replace('{url}', encodeURIComponent(url));
            }
            
            function get(url, successCallback, errorCallback) {
                $http.get(proxiedURL(url)).success(function(response) {
                    if(response.status.http_code === 200) {
                        successCallback.call(undefined, response.contents);
                    }
                    else if(errorCallback) {
                        errorCallback.call(undefined, response.status.http_code);
                    }
                });
            }
            
            return {
                get: get,
                proxiedURL: proxiedURL
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';

    sat.SteamAPIThing.factory('AuthorizationService', [
        '$window',
        '$location',
        'AccountService',
        'StorageService',
        
        function($window, $location, accountService, storageService) {
            var config = sat.Config.SteamAPI.authorization;
            
            function authorizationURL() {
                var params = [
                    'openid.ns=' + encodeURIComponent(config.ns),
                    'openid.mode=' + encodeURIComponent(config.mode),
                    'openid.return_to=' + encodeURIComponent(config.return_to),
                    'openid.realm=' + encodeURIComponent(config.realm),
                    'openid.identity=' + encodeURIComponent(config.identity),
                    'openid.claimed_id=' + encodeURIComponent(config.claimed_id)
                ];
                
                var url = config.url + '?' + params.join('&');
                
                return url;
            }
        
            function authorize() {
                var url = authorizationURL();
                
                $window.location = url;
            }
            
            function mock1() {
                accountService.setAccountId('76561198009046650');
                
                storageService.put('account', accountService.getAccount());
                
                $location.url('/games').replace();
            }
            
            function mock2() {
                accountService.setAccountId('76561198009046557');
                
                storageService.put('account', accountService.getAccount());
                
                $location.url('/games').replace();
            }
            
            return {
                authorize: authorize,
                mock1: mock1,
                mock2: mock2
            };
        }
    ]);
        
}).call(this);
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
(function(_, undefined) {
    'use strict';
    
    var GamesMapper = sat.Mappers.GamesMapper;
    var GameDetails = sat.Models.GameDetails;
    
    sat.SteamAPIThing.factory('GamesService', [
        'ProxyService',
        'StorageService',
        
        function(proxy, storageService) {
            var config = sat.Config.SteamAPI;
            
            function refreshOwnedGames(accountId, successCallback) {
                var url = config.url + 'IPlayerService/GetOwnedGames/v0001/?key=' + config.key + '&steamid=' + accountId + '&include_appinfo=1&format=json';
                
                proxy.get(
                    url,
                    
                    function(data) {
                        var games = new GamesMapper().map(data.response.games);
                        storageService.put('ownedGames', games);
                        successCallback.call(undefined, games);
                    },
                    
                    function(code) {
                        //TODO: handle API exceptions
                    }
                );
            }
            
            function getOwnedGames() {
                return storageService.get('ownedGames', []);
            }
            
            function getGameById(gameId) {
                var ownedGames = storageService.get('ownedGames', []);
                return _.find(ownedGames, {id: gameId});
            }

            return {
                refreshOwnedGames: refreshOwnedGames,
                getOwnedGames: getOwnedGames,
                getGameById: getGameById
            };
        }
    ]);
        
}).call(this, _);
(function(undefined) {
    'use strict';
    
    var LeasesMapper = sat.Mappers.LeasesMapper;
    
    sat.SteamAPIThing.factory('LeaseService', [
        '$http',
        'StorageService',
        
        function($http, storageService) {
            var config = sat.Config.LeaseAPI;
            
            function getGameOffers(gameId) {
                return storageService.get('leases-' + gameId, []);
            }
            
            function refreshGameOffers(gameId, successCallback) {
                var url = config.url + '?gameId=' + gameId;
                
                $http.get(url).success(function(data) {
                    var leases = new LeasesMapper().map(data);
                    storageService.put('leases-' + gameId, leases);
                    successCallback.call(undefined, leases);
                });
            }
            
            function addOffer(gameId, data, successCallback) {
                var url = config.url + '?gameId=' + gameId;
                
                $http.put(url, data).success(function(data) {
                    var leases = new LeasesMapper().map(data);
                    storageService.put('leases-' + gameId, leases);
                    successCallback.call(undefined, leases);
                });
            }
                     
            return {
                refreshGameOffers: refreshGameOffers,
                getGameOffers: getGameOffers,
                addOffer: addOffer
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    /* http://stackoverflow.com/questions/17395188/angular-validate-input-type-number */
    
    sat.SteamAPIThing.directive('toNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function (value) {
                    return parseFloat(value || '');
                });
            }
        };
    });

}).call(this);
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

                    new Tile($element[0]);
                    
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
(function(undefined) {
    'use strict';
    
    var replaceObject = sat.Utils.Object.replace;
    
    sat.SteamAPIThing.directive('offer', [
        'AccountService',
        
        function(accountService) {
            return {
                restrict: 'E',
                transclude: false,
                replace: true,
                scope: {
                    offer: '=info'
                },
                templateUrl: 'views/directives/offer.html',

                controller: function($scope) {
                    $scope.account = [];
                    accountService.getAccountDetails($scope.offer.account, function(account) {
                        $scope.account = replaceObject($scope.account, account);
                    });
                }
            };
        }
    ]);

}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('AuthorizationController', [
        '$scope',
        '$location',
        'TitleService',
        'AccountService',
        'AuthorizationService',
        
        function($scope, $location, titleService, accountService, authorizationService) {
            titleService.set([sat.Config.pageTitles.authorization]);
            
            var account = accountService.check();
            
            if(account.id) {
                $location.url('/games').replace();
            }
            
            $scope.authorize = function() {
                authorizationService.authorize();
            };
            
            $scope.mock1 = function() {
                authorizationService.mock1();
            };
            
            $scope.mock2 = function() {
                authorizationService.mock2();
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('AuthorizationResponseController', [
        '$scope',
        '$location',
        'AuthorizationService',
        'AccountService',
        'StorageService',
        
        function($scope, $location, authorizationService, accountService, storageService) {
            function getIdentity() {
                var config = sat.Config.SteamAPI.authorization;
                
                return $location.search()[config.identity_param];
            }
            
            var identity = getIdentity();
            
            if(identity) {
                accountService.setAccountIdFromIdentity(identity);
                
                storageService.put('account', accountService.getAccount());
                
                $location.url('/games').replace();
            }
            else {
                //TODO: handle Steam OpenID authorization error
            }
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('SignOutController', [
        '$scope',
        '$location',
        'AccountService',
        'StorageService',
        
        function($scope, $location, accountService, storageService) {
            storageService.flush();
            accountService.setAccount(new sat.Models.Account());
            
            $location.url('/').replace();
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    var replaceArray = sat.Utils.Array.replace;
    
    sat.SteamAPIThing.controller('GamesListController', [
        '$scope',
        'TitleService',
        'AccountService',
        'GamesService',
        'LeaseService',

        function($scope, titleService, accountService, gamesService, leaseService) {
            titleService.set([sat.Config.pageTitles.myGames]);
            
            $scope.games = gamesService.getOwnedGames();
           
            gamesService.refreshOwnedGames(accountService.getAccount().id, function(games) {
                $scope.games = replaceArray($scope.games, games);
            });
            
            $scope.activeOffers = function(game) {
                var offers = leaseService.getGameOffers(game.id);
                
                if(offers.length > 0) {
                    return true;
                }
                
                return false;
            };
            
            $scope.noActiveOffers = function(game) {
                return !$scope.activeOffers(game);
            };
            
            $scope.playTime = function(game) {
                return 1 / parseFloat(game.playTime);
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('AddGameLeaseOfferController', [
        '$scope',
        '$routeParams',
        '$location',
        'TitleService',
        'AccountService',
        'GamesService',
        'LeaseService',

        function($scope, $routeParams, $location, titleService, accountService, gamesService, leaseService) {
            var gameId = parseInt($routeParams.gameId);
            
            $scope.game = gamesService.getGameById(gameId);
            
            titleService.set([sat.Config.pageTitles.addGameLease.replace('{name}', $scope.game.name)]);
            
            $scope.description = '';
            $scope.amount = 0;
            
            $scope.add = function() {
                var data = {
                    description: $scope.description,
                    amount: $scope.amount,
                    account: accountService.getAccount().id
                };
                
                leaseService.addOffer(gameId, data, function() {
                    $location.url('/games').replace();
                });
            };
        }
    ]);
        
}).call(this);
(function(undefined) {
    'use strict';
    
    sat.SteamAPIThing.controller('GameLeaseOffersController', [
        '$scope',
        '$routeParams',
        '$location',
        'TitleService',
        'AccountService',
        'GamesService',
        'LeaseService',

        function($scope, $routeParams, $location, titleService, accountService, gamesService, leaseService) {
            var gameId = parseInt($routeParams.gameId);
            
            $scope.game = gamesService.getGameById(gameId);
            
            titleService.set([sat.Config.pageTitles.gameLeases.replace('{name}', $scope.game.name)]);
            
            $scope.offers = leaseService.getGameOffers(gameId);
            
            $scope.offerAmount = function(offer) {
                return parseFloat(offer.amount);
            };
        }
    ]);
        
}).call(this);
angular.module('SteamAPIThing').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/addoffer.html',
    "<a href=\"#/signout\">Sign Out</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"col-md-9\">\r" +
    "\n" +
    "    <h1>Add offer for <em>{{game.name}}</em></h1>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    <form name=\"offer\" class=\"form-horizontal\" role=\"form\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "        <div class=\"form-group control-group\" ng-class=\"{'has-error': !offer.description.$valid}\">\r" +
    "\n" +
    "            <label class=\"col-sm-2 control-label\" for=\"description\">Description</label>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <div class=\"col-sm-10\">\r" +
    "\n" +
    "                <textarea class=\"form-control\" name=\"description\" rows=\"3\" ng-model=\"description\" ng-minlength=\"0\" ng-maxlength=\"300\" required></textarea>\r" +
    "\n" +
    "                <span ng-show=\"offer.description.$error.minlength || offer.description.$error.maxlength\">The length must be in range 0 to 300!</span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <div class=\"form-group control-group\" ng-class=\"{'has-error': !offer.amount.$valid}\">\r" +
    "\n" +
    "            <label class=\"col-sm-2 control-label\" for=\"amount\">Amount</label>\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <div class=\"col-sm-10\">\r" +
    "\n" +
    "                <input class=\"form-control\" name=\"amount\" ng-model=\"amount\" type=\"number\" min=\"0\" max=\"100\" required to-number ></input>\r" +
    "\n" +
    "                \r" +
    "\n" +
    "                <span ng-show=\"offer.amount.$error.integer\">This is not valid integer!</span>\r" +
    "\n" +
    "                <span ng-show=\"offer.amount.$error.min || offer.amount.$error.max\">The value must be in range 0 to 100!</span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <div class=\"form-group\">\r" +
    "\n" +
    "            <div class=\"col-sm-offset-2 col-sm-10\">\r" +
    "\n" +
    "                <button type=\"submit\" class=\"btn btn-default\" ng-click=\"add()\" ng-class=\"{'btn-danger disabled': !offer.$valid}\">Add</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/authorize.html',
    "<a id=\"authorize\" href=\"\" ng-click=\"authorize()\"><img src=\"images/authorize.steam.png\" alt =\"\" /></a>\r" +
    "\n" +
    "<a href=\"\" ng-click=\"mock1()\">Use fake account #1</a>\r" +
    "\n" +
    "<a href=\"\" ng-click=\"mock2()\">Use fake account #2</a>"
  );


  $templateCache.put('views/directives/game.html',
    "<div class=\"game metro-tile\" ng-click=\"flip()\">\r" +
    "\n" +
    "    {{rgb}}\r" +
    "\n" +
    "    <div class=\"front face\">\r" +
    "\n" +
    "        <h2 class=\"title\">{{game.name}}</h2>\r" +
    "\n" +
    "        <img class=\"background\" ng-src=\"{{getBackground()}}\" alt= \"\" />\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    <div class=\"back face\">\r" +
    "\n" +
    "        <div class=\"title\">{{game.name}}</div>\r" +
    "\n" +
    "        <div class=\"background\">&nbsp;</div>\r" +
    "\n" +
    "        <img class=\"icon\" ng-src=\"http://media.steampowered.com/steamcommunity/public/images/apps/{{game.id}}/{{game.icon}}.jpg\" alt= \"\" />\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <div class=\"actions\">\r" +
    "\n" +
    "            <div>Time played: {{game.playTime / 60 | number:0}}h</div>\r" +
    "\n" +
    "            <a ng-show=\"offers.length > 0\" href=\"#/game/{{game.id}}/offers\"><em>{{offers.length}}</em> active offers</a>\r" +
    "\n" +
    "            <a href=\"#/add-offer/{{game.id}}\">Add lease offer</a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/directives/offer.html',
    "<div class=\"offer\">\r" +
    "\n" +
    "    <div>{{offer.description}} - ${{offer.amount}}</div>\r" +
    "\n" +
    "    <div><a href=\"{{account.url}}\" target=\"_blank\">{{account.name}}</a> <img ng-src=\"{{account.avatar}}\" alt=\"\" /></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/games.html',
    "<a href=\"#/signout\">Sign Out</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"col-md-9\">\r" +
    "\n" +
    "    <h1>Games</h1>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "    <div class=\"games\">\r" +
    "\n" +
    "        <game ng-repeat=\"game in games | filter:activeOffers | orderBy:playTime\"\r" +
    "\n" +
    "            data-info=\"game\"\r" +
    "\n" +
    "        ></game>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <game ng-repeat=\"game in games | filter:noActiveOffers | orderBy:playTime\"\r" +
    "\n" +
    "            data-info=\"game\"\r" +
    "\n" +
    "        ></game>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('views/offers.html',
    "<a href=\"#/signout\">Sign Out</a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"col-md-9\">\r" +
    "\n" +
    "    <h1>Lease offers for <em>{{game.name}}</em></h1>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"offers\">\r" +
    "\n" +
    "        <offer ng-repeat=\"offer in offers | orderBy:offerAmount\"\r" +
    "\n" +
    "            data-info=\"offer\"\r" +
    "\n" +
    "        ></offer>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
