describe('Customer E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var lastnameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var documentVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var pictureVarTest = 'Val' + Math.floor(Math.random() * 10000);

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['customers'] = [];
                records['customers'].push({"id":1,"name":"Customer3","lastName":"Customer",
                    "serviceRequests":[]});

            }]);
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('should read one customer', function () {
        browser.get('#/customer');
        expect(element(by.id('0-name')).getText()).toBe('Customer3');
        expect(element(by.id('0-lastName')).getText()).toBe('Customer');
    });

    it('should edit one customer', function () {
        browser.get('#/customer');
        element(by.id('0-edit-btn')).click();

        element(by.id('name')).clear().sendKeys('New name');
        element(by.id('lastName')).clear().sendKeys('New lastname');

        element(by.id('save-customer')).click();

        expect(element(by.id('0-name')).getText()).toBe('New name');
        expect(element(by.id('0-lastName')).getText()).toBe('New lastname');
    });
});
