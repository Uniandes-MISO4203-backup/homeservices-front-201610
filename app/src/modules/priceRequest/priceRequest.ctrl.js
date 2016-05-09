(function (ng) {
    var mod = ng.module('priceRequestModule', ['restangular']);

    mod.controller('priceRequestCtrl', ['$scope', 'Restangular','$state','$modal',
        function ($scope, Restangular, $state, $modal) {
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
        $scope.score=function(serviceRequest){
            $modal.open({
                templateUrl: "src/modules/priceRequest/customerReview.tpl.html",
                resolve: {serviceRequest: serviceRequest},
                controller: 'customerReviewModalShowCtrl', controllerAs: 'ctrl'
            });
        }
    }]);
    mod.controller('customerReviewModalShowCtrl', ['$scope', 'Restangular','$state', '$window','$modalInstance','serviceRequest',
        function ($scope, Restangular, $state, $window, $modalInstance, serviceRequest) {
        $scope.serviceRequest = serviceRequest;
        $scope.value='3';

        $scope.sendReview = function () {
            Restangular.all("reviews").post({name: $scope.name, value: $scope.value, customer: serviceRequest.customer}).
            then(function () {
                $modalInstance.close();
            });
        };
    }]);


})(window.angular);
