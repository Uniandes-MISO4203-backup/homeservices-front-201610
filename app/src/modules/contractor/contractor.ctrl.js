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
            this.globalActions.create = {
                show: function () {
                    return false;
                }
            };
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

    mod.controller('ContractoreducationsCtrl', ['CrudCreator', '$scope', 'educationModel',
        function (ngCrud, $scope, model) {
            ngCrud.extendCompChildCtrl({
                name: 'educations',
                displayName: 'Educations',
                parent: 'contractor',
                ctrl: this,
                scope: $scope,
                model: model
            });
        }]);

    mod.controller('ContractorsskillsCtrl', ['CrudCreator', '$scope',
        'skillModel', 'skillContext', 'contractorContext', '$state',
        function (ngCrud, $scope, model, url, parentUrl, $state) {
            ngCrud.extendAggChildCtrl({
                name: 'skills',
                displayName: 'Skills',
                parentUrl: parentUrl,
                listUrl: url,
                ctrl: this,
                scope: $scope,
                model: model
            });
            this.searchBySkill = function (skill) {
                if (skill) {
                    $state.go('contractorBySkill', {skillName : skill});
                }
            };
        }
    ]);

    mod.controller('ContractorsExperienceCtrl', ['CrudCreator', '$scope',
        'workExperienceModel','workExperienceContext','contractorContext', '$state',
        function (ngCrud, $scope, model, url, parentUrl, $state) {
            ngCrud.extendCompChildCtrl({
                name: 'workExperiences',
                displayName: 'Work Experiences',
                parent: 'contractor',
                ctrl: this,
                parentUrl: parentUrl,
                listUrl: url,
                scope: $scope,
                model: model
            });
            this.searchByExperience = function () {
                if (this.experienceName) {
                    $state.go('contractorByExperience', {experienceName : this.experienceName});
                }
            };
        }]);

})(window.angular);
