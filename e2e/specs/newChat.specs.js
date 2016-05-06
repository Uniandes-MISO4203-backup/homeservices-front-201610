describe('NewChat E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');
           
           mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var hireUrl = new RegExp(baseUrl + '/(\\w+)');
                    $httpBackend.whenPOST(hireUrl).respond(function (method, url) {
                        console.log('PUT');
                        return [200, {}, {}];
                    });
            }]); 
        });
    });

    it('NewChat', function () {
        browser.get('#/newchat/1/1/1');
        element(by.css('#-datepicker')).click();
        element(by.css('button.btn-info')).click();
        element(by.css('button.submit')).click();

        expect(browser.getCurrentUrl()).toContain('#/serviceRequestPrices?serviceRequestId');

    });
});
