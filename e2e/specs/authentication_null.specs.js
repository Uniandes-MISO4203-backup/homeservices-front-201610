describe('Authentication null E2E Testing', function () {
	browser.driver.manage().window().maximize();        
    
    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var statisticURL = new RegExp(baseUrl + '/(\\w+)/(\\w+)');
                    $httpBackend.whenGET(statisticURL).respond(function (method, url) {
                        console.warn('GET skills');
                        return [200, null, {}];
                    });
                }
            ]);
            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests'] = [];
            }]);
        });
    });

    it('authentication null', function () {       
        browser.get('#/catalog');
        expect(element.all(by.css('ul#menu li')).count()).toEqual(0);
    });
});

