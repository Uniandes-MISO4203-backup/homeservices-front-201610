(function (ng) {
    var mod = ng.module('searchServiceRequestModule');

    mod.controller('searchSRCtrl', ['CrudCreator','$scope',
        'searchServiceRequestContext','searchServiceRequestModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'searchSRCtrl',
                displayName: 'Search Service Request',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });

        }]);


})(window.angular);
