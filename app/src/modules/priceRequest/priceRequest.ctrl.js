(function (ng) {
    var mod = ng.module('priceRequestModule', ['restangular']);

    mod.controller('priceRequestCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
            $scope.priceResquest = Restangular.all('priceRequests').getList().$object;

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
        }]);

})(window.angular);

