exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        'e2e/specs/*.js'
    ],
    capabilities: {
        'browserName': 'firefox'
    },
    directConnect: true,
    baseUrl: 'http://localhost:9001/',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
