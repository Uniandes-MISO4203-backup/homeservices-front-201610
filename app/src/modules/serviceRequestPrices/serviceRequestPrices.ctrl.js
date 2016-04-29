(function (ng) {
    var  mod = ng.module('serviceRequestPricesModule');

    mod.controller('serviceRequestPricesCtrl', ['$scope','Restangular',
            'serviceRequestContext', 'serviceRequestPriceContext','$state',
        function ($scope, Restangular, parentUrl, url,$state) {
            $scope.currentDate = new Date();
            $scope.serviceRequestId = $state.params.serviceRequestId;
            $scope.fetchData = function () {
                $scope.serviceRequest = Restangular.one(parentUrl, $scope.serviceRequestId).get().then(function (object) {
                    $scope.serviceRequest = object;
                    $scope.priceRequestLimit = new Date(object.priceRequestLimit);
                });
                Restangular.one(parentUrl, $scope.serviceRequestId).getList(url).
                then(function (data) {
                    $scope.data = data;
                });
            };
            $scope.fetchData();
            $scope.create = function (id) {
                $state.go('newchat', {customer: $scope.serviceRequest.customer.id, contractor: id, service: $scope.serviceRequestId});
            };
            $scope.goChat = function (id) {
                $state.go('chat', {chatName: "CU" + $scope.serviceRequest.customer.id + "CO" + id});
            };
            $scope.hire = function (item) {
                Restangular.one(parentUrl, $scope.serviceRequestId).one("hire", item.id).put().
                then(function () {
                    $scope.fetchData();
                });
            };
        }]);
})(window.angular);
