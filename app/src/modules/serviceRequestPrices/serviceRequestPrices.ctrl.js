(function (ng) {
    ng.module('serviceRequestPricesModule')
            .controller('serviceRequestPricesCtrl', ['$scope','Restangular',
            'serviceRequestContext', 'serviceRequestPriceContext','$state',
        function ($scope, Restangular, parentUrl, url,$state) {
            $scope.serviceRequestId = $state.params.serviceRequestId;
            $scope.fetchData = function () {
                $scope.data = Restangular.one(parentUrl, $scope.serviceRequestId).getList(url);
            }
            $scope.fetchData();
        }]);
})(window.angular);
