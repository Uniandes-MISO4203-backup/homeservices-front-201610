(function (ng) {

    var mod = ng.module('serviceRequestMock', ['ngMockE2E']);

    mod.run(['$httpBackend', '$log', function ($httpBackend, $log) {
            var ignore_regexp = new RegExp('^((?!api).)*$');
            /*
             * @type Array
             * items:
             */
            items = [{
                    id: 1,
                    name: 'Service mock 1',
                    price: 1000,
                    recomendedTime: 'recomendedTime',
                    score: 5,
                    creationDate: (new Date()),
                    dueDate: (new Date()),
                    status: {id: 1, name: 'Status'}
                }];
            /*
             * Ignora las peticiones GET, no contempladas en la Exp regular ignore_regexp
             */
            $httpBackend.whenGET(ignore_regexp).passThrough();

            $httpBackend.whenGET(/.*/).respond(function () {
                $log.debug("Testing");
                return [200, items, {}];
            });
        }]);

})(window.angular);
