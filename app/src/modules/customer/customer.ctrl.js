(function (ng) {
    var mod = ng.module('customerModule');

    mod.controller('customerCtrl', ['CrudCreator', '$scope',
        'customerContext', 'customerModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'customer',
                displayName: 'Customer',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.fetchRecords();
            this.globalActions.create = {
                show: function () {
                    return false;
                }
            };
        }]);

    mod.controller('CustomerserviceRequestsCtrl', ['CrudCreator', '$scope',
        'serviceRequestModel', 'serviceRequestContext', 'customerContext',
        function (ngCrud, $scope, model, url, parentUrl) {
            ngCrud.extendAggChildCtrl({
                name: 'serviceRequests',
                displayName: 'Service Requests',
                parentUrl: parentUrl,
                listUrl: url,
                ctrl: this,
                scope: $scope,
                model: model
            });
            this.loadRefOptions();
        }]);
})(window.angular);
