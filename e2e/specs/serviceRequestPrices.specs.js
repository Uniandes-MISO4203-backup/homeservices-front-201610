describe('ServiceRequest E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');
            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var recordUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(\\w+)');
                    var hireUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(\\w+)/([0-9]+)');
                    var array = [
                        {contractor:{name: 'Contractor 1'}, priceRequestStatus: 'PENDIENTE' },
                        {contractor:{name: 'Contractor 2'}, priceRequestStatus: 'PENDIENTE' }
                    ]
                    var count = 0;
                    $httpBackend.whenGET(recordUrl).respond(function (method, url) {
                        console.log('GET');
                        return [200, array, {}];
                    });
                    $httpBackend.whenPUT(hireUrl).respond(function (method, url) {
                        console.log('PUT');
                        return [200, {}, {}];
                    });
            }]);
            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests']=[];
                records['serviceRequests'].push({
                    "id":1,"name":"Request service 1","price":10000,
                    "recommendedTime":"10","creationDate":"2016-04-17",
                    "dueDate":"2016-04-19","priceRequestLimit":"2016-04-18",
                    "expectedskills":[],status:{id: 1, name: 'Start'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 
            }]); 
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('R9 Visit serviceRequestPrices', function () {
        browser.get('#/serviceRequestPrices?serviceRequestId=1');
        expect(element(by.id('serviceRequestName')).getText()).toEqual("Request service 1");
        expect(element.all(by.repeater('item in data')).count()).toEqual(2);
    });
    it('R10 Create chat', function () {
        browser.get('#/serviceRequestPrices?serviceRequestId=1');
        var btn = element.all(by.css('.create-chat-btn')).first();
        btn.click();
        expect(browser.getCurrentUrl()).toContain('#/newchat/');
    });
    it('R10 Go chat', function () {
        browser.get('#/serviceRequestPrices?serviceRequestId=1');
        var btn = element.all(by.css('.go-chat-btn')).first();
        btn.click();
        expect(browser.getCurrentUrl()).toContain('/#/chat/');
    });

    it('R11 Hiring', function () {
        browser.get('#/serviceRequestPrices?serviceRequestId=1');
        var btn = element.all(by.css('.hire-btn')).first();
        btn.click();
        //browser.pause();
        var elm = element.all(by.css('.price-state')).first();
        expect(elm.getText()).toEqual('PENDIENTE');
    });
});
