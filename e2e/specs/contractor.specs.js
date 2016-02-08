describe('Contractor E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var lastnameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var documentVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var pictureVarTest = 'Val' + Math.floor(Math.random() * 10000);

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['contractors'] = [];

            }]);
        });
    });

    it('should create one contractor', function () {
        browser.get('#/contractor');
        element(by.id('create-contractor')).click();
        element(by.id('name')).sendKeys(nameVarTest);
        element(by.id('lastName')).sendKeys(lastnameVarTest);
        element(by.id('document')).sendKeys(documentVarTest);
        element(by.id('picture')).sendKeys(pictureVarTest);
        element(by.id('save-contractor')).click();
        expect(element.all(by.repeater('record in records')).count()).toEqual(1);
    });

    it('should read one contractor', function () {
        expect(element(by.id('0-name')).getText()).toBe(nameVarTest);
        expect(element(by.id('0-lastName')).getText()).toBe(lastnameVarTest);
        expect(element(by.id('0-document')).getText()).toBe(documentVarTest);
        expect(element(by.id('0-picture')).getText()).toBe(pictureVarTest);
    });

    it('should edit one contractor', function () {
        element(by.id('0-edit-btn')).click();

        element(by.id('name')).clear().sendKeys('New' + nameVarTest);
        element(by.id('lastName')).clear().sendKeys('New' + lastnameVarTest);
        element(by.id('document')).clear().sendKeys('New' + documentVarTest);
        element(by.id('picture')).clear().sendKeys('New' + pictureVarTest);

        element(by.id('save-contractor')).click();

        expect(element(by.id('0-name')).getText()).toBe('New' + nameVarTest);
        expect(element(by.id('0-lastName')).getText()).toBe('New' + lastnameVarTest);
        expect(element(by.id('0-document')).getText()).toBe('New' + documentVarTest);
        expect(element(by.id('0-picture')).getText()).toBe('New' + pictureVarTest);
    });

    it('should delete the contractor', function () {
        element(by.id('0-delete-btn')).click();
        expect(element.all(by.id('0-name')).count()).toEqual(0);
        expect(element.all(by.id('0-lastName')).count()).toEqual(0);
        expect(element.all(by.id('0-document')).count()).toEqual(0);
        expect(element.all(by.id('0-picture')).count()).toEqual(0);
    });
});
