(function (ng) {
    var mod = ng.module('serviceRequestModule');

    mod.controller('serviceRequestCtrl', ['CrudCreator', '$scope',
        'serviceRequestContext', 'serviceRequestModel','$state',
        function (ngCrud, $scope, url, model,$state) {
            ngCrud.extendController({
                name: 'serviceRequest',
                displayName: 'Service Request',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });

            var self = this;

            self.recordActions.edit.show=function(record){
                return undefined !== record.status && record.status.id==1;
            };

            self.recordActions.delete.show=function(record){
                return undefined !== record.status && record.status.id==1;
            };

            self.recordActions.searchContractors = {
                 displayName: 'Search Contractors',
                 icon: 'star',
                 fn: function (record) {

                     $state.go('contractorsByExpectedSkills', {idServiceRequest : record.id});
                 },
                 show: function (record) {
                     return record.status.id==1;
                 }
             };


            this.loadRefOptions();
            this.fetchRecords();
            this.searchByDescription = function (descriptionService) {
                if (descriptionService) {

                    $state.go('serviceRequest', {description: descriptionService});
                }
            };
            this.recordActions.showPriceList = {
                displayName: 'Price list',
                icon: 'star',
                fn: function (item) {
                    $state.go('serviceRequestPrices', {serviceRequestId: item.id});

                },
                show: function () {
                    return true;
                }
            };

            this.globalActions.searchDescription = {
                displayName: 'Search by Description',
                icon: 'star',
                fn: function () {
                    $state.go('searchSR');

                },
                show: function () {
                    return true;
                }
            };
        }]);

    mod.controller('ServicesRequestsexpectedskillsCtrl', ['CrudCreator', '$scope',
        'skillModel', 'skillContext', 'serviceRequestContext',
        function (ngCrud, $scope, model, url, parentUrl) {
            ngCrud.extendAggChildCtrl({
                name: 'expectedskills',
                displayName: 'Expectedskills',
                parentUrl: parentUrl,
                listUrl: url,
                ctrl: this,
                scope: $scope,
                model: model
            });



        }]);
})(window.angular);
