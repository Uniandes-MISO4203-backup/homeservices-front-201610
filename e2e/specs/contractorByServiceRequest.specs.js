describe('contractorsByServiceRequests E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');
        
            mod.run(["$httpBackend",
                function($httpBackend){
                    baseUrl='api';
                    var pricelistUrl = new RegExp(baseUrl + '/serviceRequests/([0-9]+)/pricelist');
                    var resourceRecordUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)/(\\w+)');
                    var recordUrl = new RegExp(baseUrl + '/(\\w+)/([0-9]+)');
                    var authURL = new RegExp(baseUrl + '/users/me');
                    $httpBackend.whenGET(authURL).respond(function (method, url) {
                        console.warn('GET auth');
                        return [200, {"email":"contractor_ciclo3@saberes.com","givenName":"Contractor",
                            "middleName":"cICLO","rememberMe":false,
                            "roles":["customer"],"surName":"Ciclo 3",
                            "userName":"contractor_ciclo3"}, 
                            {}];
                    });
                    var priceRequestarray = [
                        {contractor:{id: 1, name: 'Contractor 1'}, serviceRequest:{id:1}, priceRequestStatus: 'PENDIENTE' },
                        {contractor:{id:3, name: 'Contractor 3'}, serviceRequest:{id:1}, priceRequestStatus: 'PENDIENTE' }
                    ]
                    $httpBackend.whenGET(pricelistUrl).respond(function (method, url) {
                        console.warn('GET');
                        return [200, priceRequestarray, {}];
                    });
                    var array = [
                        {name: 'Excelent service', value: 5},
                        {name: 'bad service', value: 2},
                        {name: 'Excelent service 2', value: 5},
                        {name: 'Excelent service 3', value: 5},
                        {name: 'Excelent service 4', value: 5}
                    ]
                    $httpBackend.whenGET(resourceRecordUrl).respond(function (method, url) {
                        console.warn('GET');
                        return [200, array, {}];
                    });
                    $httpBackend.whenPOST(recordUrl).respond(function (method, url) {
                        console.warn('POST');
                        return [200, {}, {}];
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
                    "dueDate":"2016-04-19","priceRequestLimit":"2100-04-18",
                    "expectedskills":[],status:{id: 3, name: 'finished'},
                    "customer":{"id":1,"name":"Customer3","lastName":"Customer3",
                        "serviceRequests":[]},"description":"Nada"}); 
            }]);
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('R12-3 read comments', function () {
        browser.get('#/contractorsByServiceRequest?idServiceRequest=1');
        element(by.css('.btn-show')).click();
        expect(element(by.css('.score-5 span.score')).getText()).toBe('4');
        element(by.css('.btn-ok')).click();
    });

    it('R7 already registered', function () {
        browser.get('#/contractorsByServiceRequest?idServiceRequest=1');
        element(by.css('.btn-send-request')).click();
        expect(element.all(by.css('.alert.alert-danger')).count()).toEqual(1);
    });

    it('R7 send request', function () {
        browser.get('#/contractorsByServiceRequest?idServiceRequest=1');
        element.all(by.css('.btn-send-request')).last().click();
        expect(element.all(by.css('.alert')).count()).toEqual(1);
    });
});
