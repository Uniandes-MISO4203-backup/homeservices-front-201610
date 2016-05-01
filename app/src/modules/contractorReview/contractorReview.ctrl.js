(function (ng) {
    var mod = ng.module('contractorReviewModule', ['restangular']);

    mod.controller('contractorReviewCtrl', ['$scope', 'Restangular','$state', function ($scope, Restangular, $state) {
            var parentUrl = 'serviceRequests', url = 'pricelist';
            $scope.serviceRequestId = $state.params.serviceRequestId;
            $scope.fetchData = function () {
                $scope.serviceRequest = Restangular.one(parentUrl, $scope.serviceRequestId).get().then(function (object) {
                    $scope.serviceRequest = object;
                });
                Restangular.one(parentUrl, $scope.serviceRequestId).getList(url).
                then(function (data) {
                    $scope.data = data;
                });
            };

            $scope.fetchData();
        }]);

})(window.angular);
