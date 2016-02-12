(function (ng) {
    ng.module('catalogModule', ['serviceRequestModule'])
            .constant('catalogContext', 'catalog')
            .controller('catalogCtrl', ['$scope', 'CrudCreator',
                'serviceRequestModel', 'catalogContext',
                function ($scope, ngCrud, model, url) {
                    ngCrud.extendController({
                        name: 'catalog',
                        displayName: 'Catalog',
                        ctrl: this,
                        scope: $scope,
                        model: {fields: model.fields},
                        url: url
                    });
                    this.readOnly = true;
                    this.fetchRecords();
                }]);
})(window.angular);
