describe('Contractor E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var lastnameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var documentVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var pictureVarTest = 'Val' + Math.floor(Math.random() * 10000);
        var telefono = 'Val' + Math.floor(Math.random() * 10000);
        
    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['contractors'] = [];
                records['contractors'].push({"id":1,"name":"Contractor2","lastName":"Contractor2"});

            }]);
        });
    });

    ('should read one contractor', function () {
        browser.get('#/contractor');
        expect(element(by.id('0-name')).getText()).toBe('Contractor2');
        expect(element(by.id('0-lastName')).getText()).toBe('Contractor2');
    });

    it('should edit one contractor', function () {
        browser.get('#/contractor');
        element(by.id('0-edit-btn')).click();
        element(by.id('name')).clear().sendKeys('New name');
        element(by.id('lastName')).clear().sendKeys('New lastname');
        
        element.all(by.css("#childs a")).get(0).click();
        element.all(by.css("#childs a")).get(1).click();
        element.all(by.css("#childs a")).get(2).click();


        element(by.id('save-contractor')).click();

        expect(element(by.id('0-name')).getText()).toBe('New name');
        expect(element(by.id('0-lastName')).getText()).toBe('New lastname');
    });
});
