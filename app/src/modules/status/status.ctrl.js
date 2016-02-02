(function (ng) {
    var mod = ng.module('statusModule');

    mod.controller('statusCtrl', ['CrudCreator', '$scope',
        'statusContext', 'statusModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'status',
                displayName: 'Status',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.fetchRecords();
        }]);
})(window.angular);
