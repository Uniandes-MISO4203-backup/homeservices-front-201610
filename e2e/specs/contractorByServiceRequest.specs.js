describe('contractorsByServiceRequests E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');
        
            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var recordUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(\\w+)');
                    var array = [
                        {name: 'Excelent service', value: 5},
                        {name: 'bad service', value: 2},
                        {name: 'Excelent service 2', value: 5},
                        {name: 'Excelent service 3', value: 5},
                        {name: 'Excelent service 4', value: 5}
                    ]
                    $httpBackend.whenGET(recordUrl).respond(function (method, url) {
                        console.warn('GET');
                        return [200, array, {}];
                    });
                }
            ]);

            mod.run(['ngCrudMock.mockRecords', function(records){
                records['contractors'] = [];
                records['contractors'].push({"id":1,"name":"Contractor1","lastName":"Contractor1"});
                records['contractors'].push({"id":2,"name":"Contractor2","lastName":"Contractor2"});
                records['serviceRequests']=[];
                records['serviceRequests'].push({
                    "id":1,"name":"Request service 1","price":10000,
                    "recommendedTime":"10","creationDate":"2016-04-17",
                    "dueDate":"2016-04-19","priceRequestLimit":"2016-04-18",
                    "expectedskills":[],status:{id: 3, name: 'finished'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 
            }]);
        });
    });

    it('R12-3 read comments', function () {
        browser.get('#/contractorsByServiceRequest?idServiceRequest=1');
        element(by.css('.btn-show')).click();

        expect(element(by.css('.score-5 span.score')).getText()).toBe('4');
    });
});
