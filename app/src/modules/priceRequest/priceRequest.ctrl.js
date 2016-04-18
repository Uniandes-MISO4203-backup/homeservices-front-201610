(function (ng) {
    var mod = ng.module('priceRequestModule', ['restangular']);

    mod.controller('priceRequestCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
            $scope.priceResquest = Restangular.all('priceRequests').getList().$object;

            $scope.rejectPriceRequest = function rejectPriceRequest(x) {
                var priceRequestCopy = Restangular.copy(x);
                priceRequestCopy.status = 'RECHAZADA';
                priceRequestCopy.put();
                $scope.priceResquest.splice(x);
            };

            $scope.acceptPriceRequest = function acceptPriceRequest(x) {
                var priceRequestCopy = Restangular.copy(x);
                priceRequestCopy.status = 'ACEPTADA';
                priceRequestCopy.put();
                $scope.priceResquest.splice(x);
            };
        }]);

})(window.angular);

