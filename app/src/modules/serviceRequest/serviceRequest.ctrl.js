(function (ng) {
    var mod = ng.module('serviceRequestModule');

    mod.controller('serviceRequestCtrl', ['CrudCreator', '$scope',
        'serviceRequestContext', 'serviceRequestModel','$state',
        function (ngCrud, $scope, url, model,$state) {
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
            this.searchByDescription = function (descriptionService) {
                if (descriptionService) {

                    $state.go('serviceRequest', {description: descriptionService});
                }
            };
            this.globalActions.searchDescription = {
                displayName: 'Search by Description',
                icon: 'star',
                fn: function () {
                    $state.go('searchSR');

                },
                show: function () {
                    return true;
                }
            };
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
