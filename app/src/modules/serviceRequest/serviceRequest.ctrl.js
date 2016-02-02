(function (ng) {
    var mod = ng.module('serviceRequestModule');

    mod.controller('serviceRequestCtrl', ['CrudCreator', '$scope',
        'serviceRequestContext', 'serviceRequestModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'serviceRequest',
                displayName: 'Service Request',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.loadRefOptions();
            this.fetchRecords();
        }]);

    mod.controller('ServicesRequestsexpectedskillsCtrl', ['CrudCreator', '$scope',
        'skillModel', 'skillContext', 'serviceRequestContext',
        function (ngCrud, $scope, model, url, parentUrl) {
            ngCrud.extendAggChildCtrl({
                name: 'expectedskills',
                displayName: 'Expectedskills',
                parentUrl: parentUrl,
                listUrl: url,
                ctrl: this,
                scope: $scope,
                model: model
            });
        }]);
})(window.angular);
