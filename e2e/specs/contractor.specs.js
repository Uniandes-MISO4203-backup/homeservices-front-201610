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

            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var skillURL = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(skills)');
                    var skillRecordURL = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(skills)/([0-9]+)');
                    var recordUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)');
                    var authURL = new RegExp(baseUrl + '/users/me');
                    $httpBackend.whenGET(authURL).respond(function (method, url) {
                        console.warn('GET auth');
                        return [200, {"email":"contractor_ciclo3@saberes.com","givenName":"Contractor",
                            "middleName":"cICLO","rememberMe":false,
                            "roles":["contractor"],"surName":"Ciclo 3",
                            "userName":"contractor_ciclo3"}, 
                            {}];
                    });
                    var skillsArray = [
                        {name: 'skill1', id: 1},
                        {name: 'skill2', id: 2}
                    ]
                    $httpBackend.whenGET(skillURL).respond(function (method, url) {
                        console.warn('GET skills');
                        return [200, skillsArray, {}];
                    });
                    $httpBackend.whenDELETE(skillRecordURL).respond(function (method, url) {
                        console.warn('DELETE skills');
                        return [200, {}, {}];
                    });
                }
            ]);

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['contractors'] = [];
                records['contractors'].push({"id":1,"name":"Contractor2","lastName":"Contractor2"});

            }]);
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('should read one contractor', function () {
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
    it('delete skills', function () {
        browser.get('#/contractor');
        element(by.id('0-edit-btn')).click();
        element(by.id('name')).clear().sendKeys('New name skills');
        element(by.id('lastName')).clear().sendKeys('New lastname skills');
        
        element.all(by.css("#childs a")).get(0).click();
        element(by.id("0-skills")).click();
        element(by.css('.modal button.btn')).click();
        element(by.id('0-delete-btn')).click();

        expect(element.all(by.css('table tbody tr')).count()).toEqual(2);
    });
});
