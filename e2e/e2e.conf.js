var specs=['e2e/specs/*.js']
if(process.env.TEST)
    specs=[process.env.TEST]
exports.config = {
    allScriptsTimeout: 20000,
    specs: specs,
    capabilities: {
        'browserName': 'firefox'
    },
    directConnect: true,
    baseUrl: 'http://localhost:9001/',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 10000
    }
};
