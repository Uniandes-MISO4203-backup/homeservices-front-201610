(function (ng) {
    ng.module('serviceRequestPricesModule')
            .controller('serviceRequestPricesCtrl', ['$scope','Restangular',
            'serviceRequestContext', 'serviceRequestPriceContext','$state',
        function ($scope, Restangular, parentUrl, url,$state) {
            $scope.currentDate = new Date();
            $scope.serviceRequestId = $state.params.serviceRequestId;
            $scope.fetchData = function () {
                $scope.serviceRequest = Restangular.one(parentUrl, $scope.serviceRequestId).get().then(function (object) {
                    $scope.serviceRequest = object;
                    $scope.priceRequestLimit = new Date(object.priceRequestLimit);
                });
                Restangular.one(parentUrl, $scope.serviceRequestId).getList(url).
                then(function (data) {
                    $scope.data = data;
                });
            };
            $scope.fetchData();
        }]);
})(window.angular);
