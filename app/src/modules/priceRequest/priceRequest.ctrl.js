(function (ng) {
    var mod = ng.module('priceRequestModule', ['restangular']);

    mod.controller('priceRequestCtrl', ['$scope', 'Restangular','$state', function ($scope, Restangular, $state) {
            $scope.priceResquest = Restangular.all('priceRequests').getList().$object;
            // $scope.serviceRequestT = Restangular.one('serviceRequests', $scope.priceResquest[0].serviceRequestDTO.id).get();

            $scope.rejectPriceRequest = function (x) {
                var priceRequestCopy = Restangular.copy(x);
                var index = $scope.priceResquest.indexOf(x);
                priceRequestCopy.status = 'RECHAZADA';
                priceRequestCopy.put();
                $scope.priceResquest.splice(index, 1);
            };

            $scope.acceptPriceRequest = function (x) {
                var priceRequestCopy = Restangular.copy(x);
                var index = $scope.priceResquest.indexOf(x);
                priceRequestCopy.status = 'ACEPTADA';
                priceRequestCopy.put();
                $scope.priceResquest.splice(index, 1);
            };
            $scope.goChat = function (idCustomer, idContractor) {
                $state.go('chat', {chatName: "CU" + idCustomer + "CO" + idContractor});

            };
        }]);

})(window.angular);