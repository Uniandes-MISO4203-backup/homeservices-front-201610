describe('Chat E2E Testing', function () {

	browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.addMockModule('ngCrudMock', function () {
            var mod = angular.module('ngCrudMock');
           
           mod.run(["$httpBackend",
                function($httpBackend){
                    var baseUrl='api';
                    var array={
                        "id":1,"name":"CU1CO1","creationDate":"2016-04-21",
                        "listChatMsg":[
                            {"idChatName":1,"userName":"customer_ciclo3","userMsg":"Message 1"},
                            {"idChatName":1,"userName":"customer_ciclo3","userMsg":"Message 2"}
                        ]};
                    var urlNumber = new RegExp(baseUrl + '/(\\w+)/(CU)([0-9]+)CO([0-9]+)');
                    var urlBase = new RegExp(baseUrl + '/(\\w+)');

                    $httpBackend.whenPOST(urlNumber).respond(function (method, url) {
                        return [200,{"idChatName":1,"userName":"customer_ciclo3","userMsg":"Reply"}, {}];
                    });

                    $httpBackend.whenGET(urlNumber).respond(function (method, url) {
                        return [200,array, {}];
                    });
            }]); 
        });
    });
    afterEach(function () {
        browser.clearMockModules();
    })

    it('NewChat', function () {
        browser.get('#/chat/CU1CO1');
        element(by.css('.input')).sendKeys('Message3');
        element(by.css('.submit')).click(); 
        expect(element.all(by.css('.messages .masthead')).first().getText()).toBe('customer_ciclo3: Message 1'); 
    });
});
