(function (ng) {
    var mod = ng.module('categoryModule');

    mod.controller('categoryCtrl', ['CrudCreator', '$scope',
        'categoryContext', 'categoryModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'category',
                displayName: 'Category',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.fetchRecords();
        }]);
})(window.angular);
