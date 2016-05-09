describe('Authentication customer E2E Testing', function () {
	browser.driver.manage().window().maximize();        
    
    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var statisticURL = new RegExp(baseUrl + '/(\\w+)/(\\w+)');
                    var authentication = {"email":"contractor_ciclo3@saberes.com","givenName":"Contractor",
                        "middleName":"cICLO","rememberMe":false,
                        "roles":["customer"],"surName":"Ciclo 3",
                        "userName":"contractor_ciclo3"};
                    $httpBackend.whenGET(statisticURL).respond(function (method, url) {
                        console.warn('GET skills');
                        return [200, authentication, {}];
                    });
                }
            ]);
            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests'] = [];
            }]);
        });
    });

    it('authentication customer', function () {       
        browser.get('#/catalog');
        expect(element.all(by.css('ul#menu li')).first().getText()).toEqual('Customer');
    });
});

