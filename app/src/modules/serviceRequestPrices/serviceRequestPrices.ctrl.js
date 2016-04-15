(function (ng) {
    ng.module('serviceRequestPricesModule')
            .controller('serviceRequestPricesCtrl', ['CrudCreator', '$scope',
        'serviceRequestContext','serviceRequestPriceContext','serviceRequestPriceModel',
        function (ngCrud, $scope, parentUrl, url, model) {
            debugger;
            ngCrud.extendController({
                name: 'serviceRequestPrices',
                displayName: 'Service Request Prices',
                ctrl: this,
                scope: $scope,
                model: model,
                parentUrl: parentUrl,
                listUrl: url
            });
            this.loadRefOptions();
            this.fetchRecords();
        }]);
})(window.angular);
