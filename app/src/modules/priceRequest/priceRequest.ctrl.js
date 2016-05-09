(function (ng) {
    var mod = ng.module('priceRequestModule', ['restangular']);

    mod.controller('priceRequestCtrl', ['$scope', 'Restangular','$state', function ($scope, Restangular, $state) {
        $scope.priceResquest = Restangular.all('priceRequests').getList().$object;

        $scope.rejectPriceRequest = function (x) {
            var priceRequestCopy = Restangular.copy(x),
                index = $scope.priceResquest.indexOf(x);
            priceRequestCopy.status = 'RECHAZADA';
            priceRequestCopy.put();
            $scope.priceResquest.splice(index, 1);
        };

        $scope.acceptPriceRequest = function (x) {
            var priceRequestCopy = Restangular.copy(x),
                index = $scope.priceResquest.indexOf(x);
            priceRequestCopy.status = 'ACEPTADA';
            priceRequestCopy.put();
            $scope.priceResquest.splice(index, 1);
        };
        $scope.goChat = function (idCustomer, idContractor) {
            $state.go('chat', {chatName: "CU" + idCustomer + "CO" + idContractor});

        };
    }]);
    mod.controller('customerReviewModalShowCtrl', ['$scope', 'Restangular','$state', '$window','$modalInstance','serviceRequest',
        function ($scope, Restangular, $state, $window, $modalInstance, serviceRequest) {
        $scope.serviceRequest = serviceRequest;
        
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.getTimes = function (n) {
            return new Array(n);
        };
    }]);


})(window.angular);
