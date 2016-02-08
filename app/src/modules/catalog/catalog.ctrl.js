(function (ng) {
    ng.module('catalogModule', ['serviceRequestModule'])
            .constant('catalogContext', 'catalog')
            .controller('catalogCtrl', ['$scope', 'CrudCreator',
                'serviceRequestModel', 'catalogContext',
                function ($scope, ngCrud, model, url) {
                    ngCrud.extendController({
                        name: 'serviceRequest',
                        displayName: 'Service Request',
                        ctrl: this,
                        scope: $scope,
                        model: {fields: model.fields},
                        url: url
                    });
                    this.readOnly = true;
                    this.loadRefOptions();
                    this.fetchRecords();
                }]);
})(window.angular);
