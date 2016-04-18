describe('ServiceRequest E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests']=[];
                records['serviceRequests'].push({
                    "id":1,"name":"Request service 1","price":10000,
                    "recommendedTime":"10","creationDate":"2016-04-17",
                    "dueDate":"2016-04-19","priceRequestLimit":"2016-04-18",
                    "expectedskills":[],
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 
                records['pricelist']=[{price:1000}]
            }]);
        });
    });

    it('Visit serviceRequestPrices', function () {
        browser.get('#/serviceRequestPrices?serviceRequestId=1');
        //browser.pause();
        expect(element(by.id('serviceRequestName')).getText()).toEqual("Request service 1");
        expect(element.all(by.repeater('item in data')).count()).toEqual(0);
    });
});
