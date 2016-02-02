describe('Status E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['statuss'] = [];

            }]);
        });
    });

    it('should create one status', function () {
        browser.get('#/status');
        element(by.id('create-status')).click();
        element(by.id('name')).sendKeys(nameVarTest);
        element(by.id('save-status')).click();
        expect(element.all(by.repeater('record in records')).count()).toEqual(1);
    });

    it('should read one status', function () {
        expect(element(by.id('0-name')).getText()).toBe(nameVarTest);
    });

    it('should edit one status', function () {
        element(by.id('0-edit-btn')).click();

        element(by.id('name')).clear().sendKeys('New' + nameVarTest);

        element(by.id('save-status')).click();

        expect(element(by.id('0-name')).getText()).toBe('New' + nameVarTest);
    });

    it('should delete the status', function () {
        element(by.id('0-delete-btn')).click();
        expect(element.all(by.id('0-name')).count()).toEqual(0);
    });
});
