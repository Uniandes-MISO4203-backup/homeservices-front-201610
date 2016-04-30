describe('ServiceRequest E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Name';
	var priceVarTest = "1000";
	var recommendedtimeVarTest = 'Recommended time';

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
                    "expectedskills":[],status:{id: 1, name: 'Start'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 

                records['serviceRequests'].push({
                    "id":2,"name":"Request service 2","price":40000,
                    "recommendedTime":"10","creationDate":"2016-04-17",
                    "dueDate":"2016-04-19","priceRequestLimit":"2016-04-18",
                    "expectedskills":[],status:{id: 2, name: 'Working'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 

                records['serviceRequests'].push({
                    "id":3,"name":"Request service 3","price":50000,
                    "recommendedTime":"10","creationDate":"2016-04-17",
                    "dueDate":"2016-04-19","priceRequestLimit":"2016-04-18",
                    "expectedskills":[],status:{id: 3, name: 'Finished'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 

                records['categorys'] = [];
                records['categorys'].push({id: Math.floor(Math.random() * 10000), name: 'category'});

                records['customers'] = [];
                records['customers'].push({id: Math.floor(Math.random() * 10000), name: 'customer'});

                records['statuss'] = [];
                records['statuss'].push({id: Math.floor(Math.random() * 10000), name: 'status'});
            }]);
        });
    });

    it('should create one serviceRequest', function () {
        browser.get('#/serviceRequest/');
        //browser.wait(element(by.id('create-serviceRequest')).isPresent)
        element(by.id('create-serviceRequest')).click();
        element(by.id('name')).sendKeys(nameVarTest);
        element(by.id('price')).sendKeys(priceVarTest);
        element(by.id('recommendedTime')).sendKeys(recommendedtimeVarTest);
        element(by.id('category')).all(by.css('option')).last().click();
        element(by.id('save-serviceRequest')).click();
        expect(element.all(by.repeater('record in records')).count()).toEqual(4);
    });

    it('should read one serviceRequest', function () {
        browser.get('#/serviceRequest/');
        expect(element(by.id('0-name')).getText()).toBe("Request service 1");
		expect(element(by.id('0-price')).getText()).toBe('10000');
        expect(element(by.id('0-recommendedTime')).getText()).toBe('10');
    });

    it('should edit one serviceRequest', function () {
        browser.get('#/serviceRequest/');
        element(by.id('0-edit-btn')).click();
        element(by.id('name')).clear().sendKeys('New' + nameVarTest);
		element(by.id('price')).clear().sendKeys(priceVarTest + 1);
        element(by.id('recommendedTime')).clear().sendKeys('New' + recommendedtimeVarTest);

        element(by.id('save-serviceRequest')).click();

        expect(element(by.id('0-name')).getText()).toBe('New' + nameVarTest);
		expect(element(by.id('0-price')).getText()).toBe(priceVarTest + 1);
        expect(element(by.id('0-recommendedTime')).getText()).toBe('New' + recommendedtimeVarTest);
    });

    it('should delete the serviceRequest', function () {
        browser.get('#/serviceRequest/');
        element(by.id('0-delete-btn')).click();
        //browser.pause();
        expect(element.all(by.css('tbody>tr')).count()).toEqual(2);
    });

    it('R9 click to pricelist', function () {
        browser.get('#/serviceRequest/');
        element(by.id('0-showPriceList-btn')).click();
        var unixtime=(new Date()).getTime();
        while((new Date()).getTime()< unixtime+1000);
        expect(browser.getCurrentUrl()).toContain('#/serviceRequestPrices?serviceRequestId');
    });
    it('R2.1 click to pricelist', function () {
        browser.get('#/serviceRequest/');
        element(by.id('1-finishContract-btn')).click();
        expect(element.all(by.css('.alert')).count()).toEqual(1);
    });
});
