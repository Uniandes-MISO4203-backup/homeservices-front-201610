(function (ng) {
    var mod = ng.module('searchServiceRequestModule');

    mod.controller('searchSRCtrl', ['$scope',
        'searchServiceRequestContext','$state',
        function ($state) {

            this.loadRefOptions();
            this.fetchRecords();
            this.searchByDescription = function (descriptionService) {
                if (descriptionService) {

                    $state.go('serviceRequest', {description: descriptionService});
                }
            };

        }]);


})(window.angular);
