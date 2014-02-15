exports.config = {
    // chromeOnly: true,
    chromeDriver: './node_modules/protractor/selenium/chromedriver',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    capabilities: {
        'browserName': 'chrome'
    },
    
    specs: ['tests/e2e/**/*.js'],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
