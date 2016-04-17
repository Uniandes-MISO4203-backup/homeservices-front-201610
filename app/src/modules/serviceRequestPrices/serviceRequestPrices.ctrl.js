(function (ng) {
    ng.module('serviceRequestPricesModule')
            .controller('serviceRequestPricesCtrl', ['$scope','Restangular',
            'serviceRequestContext', 'serviceRequestPriceContext','$state',
        function ($scope, Restangular, parentUrl, url,$state) {
            $scope.serviceRequestId = $state.params.serviceRequestId;
            $scope.fetchData = function () {
                $scope.serviceRequest = Restangular.one(parentUrl, $scope.serviceRequestId).get();
                $scope.data = Restangular.one(parentUrl, $scope.serviceRequestId).getList(url);
                /* for testing */
                $scope.data = [{
                        id: 1,
                        price: 1000,
                        description: 'Propongo',
                        priceRequestStatus: 'open',
                        contractor: {
                            id: 1,
                            name: 'Jose',
                            lastName: 'Perez',
                            document: 'XXXXX',
                            picture: 'abc',
                            city: 'Bogota',
                            telefono: '555555'
                        }
                    }
                ];
            };
            $scope.fetchData();
        }]);
})(window.angular);
