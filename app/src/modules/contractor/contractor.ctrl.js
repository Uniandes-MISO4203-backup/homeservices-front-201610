(function (ng) {
    var mod = ng.module('contractorModule');

    mod.controller('contractorCtrl', ['CrudCreator', '$scope',
        'contractorContext', 'contractorModel',
        function (ngCrud, $scope, url, model) {
            ngCrud.extendController({
                name: 'contractor',
                displayName: 'Contractor',
                ctrl: this,
                scope: $scope,
                model: model,
                url: url
            });
            this.fetchRecords();
        }]);

    mod.controller('ContractorworkExperiencesCtrl', ['CrudCreator', '$scope', 'workExperienceModel',
        function (ngCrud, $scope, model) {
            ngCrud.extendCompChildCtrl({
                name: 'workExperiences',
                displayName: 'Work Experiences',
                parent: 'contractor',
                ctrl: this,
                scope: $scope,
                model: model
            });
        }]);

    mod.controller('ContractorsskillsCtrl', ['CrudCreator', '$scope',
        'skillModel', 'skillContext', 'contractorContext',
        function (ngCrud, $scope, model, url, parentUrl) {
            ngCrud.extendAggChildCtrl({
                name: 'skills',
                displayName: 'Skills',
                parentUrl: parentUrl,
                listUrl: url,
                ctrl: this,
                scope: $scope,
                model: model
            });
        }]);
})(window.angular);
