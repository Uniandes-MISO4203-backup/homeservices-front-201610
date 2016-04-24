(function (ng) {
    var mod = ng.module('skillModule');

    mod.controller('skillCtrl', ['CrudCreator', '$scope',
        'skillContext', 'skillModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'skill',
                displayName: 'Skill',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.fetchRecords();
        }]);
})(window.angular);
