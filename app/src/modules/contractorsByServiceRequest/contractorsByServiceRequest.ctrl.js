(function (ng) {
    var mod = ng.module('contractorsByServiceRequestModule', ['restangular','keats.youtube']);

    mod.controller('contractorsByServiceRequestCtrl', ['$scope', 'Restangular','$state', '$window','$modal',
        function ($scope, Restangular, $state, $window, $modal) {
            $scope.currentDate = new Date();
            $scope.idServiceRequest = $state.params.idServiceRequest;
            $scope.fetchData = function () {
                //Web service carga datos del service request
                Restangular.one('serviceRequests', $scope.idServiceRequest).get().then(function (object) {
                    $scope.serviceRequest = object;
                    $scope.priceRequestLimit = new Date(object.priceRequestLimit);
                });
                //Web service de datos desde el servicio contractors a la lista data
                Restangular.all('contractors').getList({idServiceRequest: $scope.idServiceRequest}).
                then(function (data) {
                    $scope.data = data;
                });
            };
            $scope.fetchData();

            $scope.showContractor = function (item) {
                $modal.open({
                    templateUrl: "src/modules/contractorsByServiceRequest/contractorsShow.tpl.html",
                    resolve: {item: item},
                    controller: 'contractorsModalShowCtrl', controllerAs: 'ctrl'
                });
            };

            $scope.sendPriceRequest = function (x) {
                Restangular.one('serviceRequests', $scope.serviceRequest.id).getList('pricelist').
                then(function (data) {
                    var present = false;
                    angular.forEach(data, function (priceRequest) {
                        if (priceRequest.serviceRequest.id === $scope.serviceRequest.id && priceRequest.contractor.id === x.id) {
                            present = true;
                        }
                    });
                    if (!present) {
                        Restangular.all('priceRequests').post({contractorDTO: x,
                            serviceRequestDTO: $scope.serviceRequest, status: 'PENDIENTE'}).
                        then(function () {
                            $scope.alerts = [{type: 'success', msg: 'Price request created'}];
                        });
                    }else {
                        $scope.alerts = [{type: 'danger', msg: 'This contractor already have price request'}];
                    }
                });
            };
        }]);
    mod.controller('contractorsModalShowCtrl', ['$scope', 'Restangular','$state', '$window','$modalInstance','item',
        function ($scope, Restangular, $state, $window, $modalInstance, item) {
        $scope.item = item;
        $scope.fetchData = function () {
            Restangular.one('contractors', item.id).getList('reviews').then(function (result) {
                $scope.counter = [0,0,0,0,0];
                angular.forEach(result, function (review) {
                    if (review.value && review.value > 0) {
                        $scope.counter[review.value - 1] = $scope.counter[review.value - 1] + 1;
                    }
                });
                $scope.reviews = result;
            });
        };
        $scope.fetchData();
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.getTimes = function (n) {
            return new Array(n);
        };
    }]);

})(window.angular);
