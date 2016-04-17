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
