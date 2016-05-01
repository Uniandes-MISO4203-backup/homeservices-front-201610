(function (ng) {
    var mod = ng.module('contractorsByServiceRequestModule', ['restangular']);

    mod.controller('contractorsByServiceRequestCtrl', ['$scope', 'Restangular','$state', '$window',
        function ($scope, Restangular, $state, $window) {
            $scope.idServiceRequest = $state.params.idServiceRequest;
            $scope.fetchData = function () {
                //Web service carga datos del service request
                Restangular.one('serviceRequests', $scope.idServiceRequest).get().then(function (object) {
                    $scope.serviceRequest = object;
                });
                //Web service de datos desde el servicio contractors a la lista data
                Restangular.all('contractors').getList({idServiceRequest: $scope.idServiceRequest}).
                then(function (data) {
                    $scope.data = data;
                });
            };
            $scope.fetchData();

            $scope.sendPriceRequest = function (x) {
                Restangular.one('priceRequests', x.id).post().
                then(function () {
                    $window.alert('Se creo solicitud de cotización!');
                });

            };
        }]);

})(window.angular);
