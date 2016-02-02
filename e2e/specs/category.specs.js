describe('Category E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var descriptionVarTest = 'Val' + Math.floor(Math.random() * 10000);

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['categorys'] = [];

            }]);
        });
    });

    it('should create one category', function () {
        browser.get('#/category');
        element(by.id('create-category')).click();
        element(by.id('name')).sendKeys(nameVarTest);
        element(by.id('description')).sendKeys(descriptionVarTest);
        element(by.id('save-category')).click();
        expect(element.all(by.repeater('record in records')).count()).toEqual(1);
    });

    it('should read one category', function () {
        expect(element(by.id('0-name')).getText()).toBe(nameVarTest);
        expect(element(by.id('0-description')).getText()).toBe(descriptionVarTest);
    });

    it('should edit one category', function () {
        element(by.id('0-edit-btn')).click();

        element(by.id('name')).clear().sendKeys('New' + nameVarTest);
        element(by.id('description')).clear().sendKeys('New' + descriptionVarTest);

        element(by.id('save-category')).click();

        expect(element(by.id('0-name')).getText()).toBe('New' + nameVarTest);
        expect(element(by.id('0-description')).getText()).toBe('New' + descriptionVarTest);
    });

    it('should delete the category', function () {
        element(by.id('0-delete-btn')).click();
        expect(element.all(by.id('0-name')).count()).toEqual(0);
        expect(element.all(by.id('0-description')).count()).toEqual(0);
    });
});
