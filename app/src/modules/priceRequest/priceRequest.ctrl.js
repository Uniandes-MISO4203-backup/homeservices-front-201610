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
        $scope.show = function (item) {
            $modal.open({
                templateUrl: "src/modules/priceRequest/customerShow.tpl.html",
                resolve: {item: item},
                controller: 'customersModalShowCtrl', controllerAs: 'ctrl'
            });
        };
        $scope.score = function (serviceRequest) {
            $modal.open({
                templateUrl: "src/modules/priceRequest/customerReview.tpl.html",
                resolve: {serviceRequest: serviceRequest},
                controller: 'customerReviewModalShowCtrl', controllerAs: 'ctrl'
            });
        };
    }]);
    mod.controller('customerReviewModalShowCtrl', ['$scope', 'Restangular','$state', '$window','$modalInstance','serviceRequest',
        function ($scope, Restangular, $state, $window, $modalInstance, serviceRequest) {
        $scope.serviceRequest = serviceRequest;
        $scope.value = '3';
        $scope.reviewCount = 1;
        $scope.fetchData = function () {
            Restangular.one('customers', serviceRequest.customer.id).getList('reviews').then(function (result) {
                $scope.reviewCount = result.count;
            });
        };
        $scope.fetchData();

        $scope.sendReview = function () {
            Restangular.all("contractors/reviews").post({name: $scope.name, value: $scope.value, customer: serviceRequest.customer}).
            then(function () {
                $modalInstance.close();
            });
        };
    }]);

    mod.controller('customersModalShowCtrl', ['$scope', 'Restangular','$state', '$window','$modalInstance','item',
        function ($scope, Restangular, $state, $window, $modalInstance, item) {
        $scope.item = item;
        $scope.fetchData = function () {
            Restangular.one('customers', item.id).getList('reviews').then(function (result) {
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
