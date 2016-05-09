describe('Statistic E2E Testing', function () {
	browser.driver.manage().window().maximize();        
    
    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');

            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var statisticURL = new RegExp(baseUrl + '/(\\w+)/(\\w+)');
                    var statisticArray = [{"name":"numClient","statistic":1},
                    {"name":"numContractor","statistic":2},
                    {"name":"numServiceReqCreate","statistic":2},
                    {"name":"numServiceReqFinished","statistic":1},
                    {"name":"numServiceReview","statistic":1}];
                    $httpBackend.whenGET(statisticURL).respond(function (method, url) {
                        console.warn('GET skills');
                        return [200, statisticArray, {}];
                    });
                }
            ]);
            mod.run(['ngCrudMock.mockRecords', function(records){
                records['serviceRequests'] = [];
            }]);
        });
    });

    it('should read statistic', function () {       
        browser.get('#/catalog');
        expect(browser.getCurrentUrl()).toContain('#/catalog');
        expect(element(by.css('#numClient .value')).getText()).toBe("1");
        expect(element(by.css('#numContractor .value')).getText()).toBe("2");
    });
});

