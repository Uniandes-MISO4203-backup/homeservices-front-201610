describe('Customer E2E Testing', function () {

	browser.driver.manage().window().maximize();

	var nameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var lastnameVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var documentVarTest = 'Val' + Math.floor(Math.random() * 10000);
	var pictureVarTest = 'Val' + Math.floor(Math.random() * 10000);

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var authURL = new RegExp(baseUrl + '/users/me');
                    $httpBackend.whenGET(authURL).respond(function (method, url) {
                        console.warn('GET auth');
                        return [200, {"email":"customer_ciclo3@saberes.com","givenName":"Contractor",
                            "middleName":"cICLO","rememberMe":false,
                            "roles":["customer"],"surName":"Ciclo 3",
                            "userName":"contractor_ciclo3"}, 
                            {}];
                    });
                }
            ]);

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['customers'] = [];
                records['customers'].push({"id":1,"name":"Customer3","lastName":"Customer",
                    "serviceRequests":[]});

                records['contractors'] = [];
                records['contractors'].push({"id":1,"name":"Contractor2","lastName":"Contractor2"});

            }]);
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('search contractor by skill', function () {
        browser.get('#/customer');
        element(by.id('btn-show-general-search')).click();
        element(by.css('#search-by-skill-form input')).sendKeys('skill');
        element(by.css('#search-by-skill-form button')).click();
        expect(element.all(by.css('table tbody tr')).count()).toEqual(1);
    });
    it('search contractor by skill', function () {
        browser.get('#/customer');
        element(by.id('btn-show-general-search')).click();
        element(by.css('#search-by-experience-form input')).sendKeys('skill');
        element(by.css('#search-by-experience-form button')).click();
        expect(element.all(by.css('table tbody tr')).count()).toEqual(1);
    });

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
