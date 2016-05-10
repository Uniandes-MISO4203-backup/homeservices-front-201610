describe('contractorReview E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');
            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var hireUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(\\w+)');
                    $httpBackend.whenPUT(hireUrl).respond(function (method, url) {
                        console.log('PUT');
                        return [200, {}, {}];
                    });
            }]);

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests'] = [];
                records['serviceRequests'].push({
                    "id":1,"name":"Request service 1","price":10000,
                    "recommendedTime":"10","creationDate":"2016-04-17",
                    "dueDate":"2016-04-19","priceRequestLimit":"2016-04-18",
                    "expectedskills":[],status:{id: 3, name: 'finished'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 
            }]);
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('R12-2 give 1 star', function () {
        browser.get('#/contractorReview?serviceRequestId=1');
        element.all(by.css('.radio')).first().click();
        element(by.css('.review')).sendKeys("Ok");
        element(by.css('.submit')).click();
        expect(browser.getCurrentUrl()).toContain('#/serviceRequest');
    });
});
