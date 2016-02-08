describe('ServiceRequest E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var priceVarTest = Math.floor(Math.random() * 10000).toString();
	var recommendedtimeVarTest = 'Val' + Math.floor(Math.random() * 10000);

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests'] = [];

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
        browser.get('#/serviceRequest');
        element(by.id('create-serviceRequest')).click();
        element(by.id('name')).sendKeys(nameVarTest);
		element(by.id('price')).sendKeys(priceVarTest);
        element(by.id('recommendedTime')).sendKeys(recommendedtimeVarTest);
        element(by.id('category')).all(by.css('option')).last().click();
        element(by.id('customer')).all(by.css('option')).last().click();
        element(by.id('status')).all(by.css('option')).last().click();
        element(by.id('save-serviceRequest')).click();
        expect(element.all(by.repeater('record in records')).count()).toEqual(1);
    });

    it('should read one serviceRequest', function () {
        expect(element(by.id('0-name')).getText()).toBe(nameVarTest);
		expect(element(by.id('0-price')).getText()).toBe(priceVarTest);
        expect(element(by.id('0-recommendedTime')).getText()).toBe(recommendedtimeVarTest);
    });

    it('should edit one serviceRequest', function () {
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
        element(by.id('0-delete-btn')).click();
        expect(element.all(by.id('0-name')).count()).toEqual(0);
        expect(element.all(by.id('0-price')).count()).toEqual(0);
        expect(element.all(by.id('0-recommendedTime')).count()).toEqual(0);
        expect(element.all(by.id('0-creationDate')).count()).toEqual(0);
        expect(element.all(by.id('0-dueDate')).count()).toEqual(0);
    });
});
