(function (ng) {
    var mod = ng.module('contractorReviewModule', ['restangular']);

    mod.controller('contractorReviewCtrl', ['$scope', 'Restangular','$state', function ($scope, Restangular, $state) {
            var parentUrl = 'serviceRequests', url = 'pricelist';
            $scope.value = '3';
            $scope.serviceRequestId = $state.params.serviceRequestId;

            $scope.fetchData = function () {
                $scope.alerts = [{type: 'success', msg: 'Contract finished'}];
                $scope.serviceRequest = Restangular.one(parentUrl, $scope.serviceRequestId).get().then(function (object) {
                    $scope.serviceRequest = object;
                });
                Restangular.one(parentUrl, $scope.serviceRequestId).getList(url).
                then(function (data) {
                    $scope.data = data;
                });
            };
            $scope.sendReview = function () {
                var contractor = null;
                angular.forEach($scope.data, function (price) {
                    if (price.priceRequestStatus === 'CONTRATADO') {
                        contractor = price.contractor;
                    }
                });
                Restangular.all("reviews").post({name: $scope.name, value: $scope.value, contractor: contractor}).then(function () {
                    $state.go('serviceRequest');
                });
            };
            $scope.fetchData();
        }]);

})(window.angular);
