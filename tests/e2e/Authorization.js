(function(undefined) {
    'use strict';
    
    var ptor;
    
    beforeEach(function() {
        browser.get('http://localhost:9001/');
        ptor = protractor.getInstance();
        ptor.ignoreSynchronization = true;
    });
  
    describe('As a user I should be able to authorize', function() {
        it('should load the authorization page', function() {
            var authorizeLink = by.id('authorize');
            expect(ptor.isElementPresent(authorizeLink)).toBe(true);
        });
        
        it('should redirect to the Steam OpenID authorization page after clicking the authorization link', function() {
            var authorizeLink = by.id('authorize');
            
            ptor.findElement(authorizeLink).click().then(function() {
                expect(browser.getCurrentUrl()).toContain('teamcommunity.com/openid/login');
            });
        });
        
        // it('should redirect to the authorization confirmation page after clicking the authorization link and authorizing with Steam OpenID', function() {
            // var authorizeLink = by.id('authorize');
            
            // ptor.findElement(authorizeLink).click().then(function() {
            
                // var usernameField = by.id('steamAccountName');
                // var passwordField = by.id('steamPassword');
                // var loginButton = by.id('imageLogin');
                
                // ptor.findElement(usernameField).sendKeys('name');
                // ptor.findElement(passwordField).sendKeys('pass');
                
                // ptor.findElement(loginButton).click();

                // ptor.sleep(3000);
                    
                // expect(browser.getCurrentUrl()).toContain('/authresponse');
            // });
        // });
    });
    
}).call(this);