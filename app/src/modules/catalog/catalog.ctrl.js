(function (ng) {
    var mod = ng.module('catalogModule', ['serviceRequestModule', 'restangular']);

    mod.controller('catalogCtrl', ['$scope','Restangular',
        function ($scope, Restangular) {
            $scope.converter={
                numClient:'Registered customers', 
                numContractor:'Registered contractors',
                numServiceReqCreate:'Registered service request',
                numServiceReqFinished:'Finished jobs',
                numServiceReview:'Successful jobs'
            };
            $scope.fetchData = function () {
                Restangular.all('serviceRequests/statistics').getList().
                then(function (result) {
                    $scope.data = result;
                });
            };
            $scope.fetchData();
        }
    ]);
})(window.angular);
