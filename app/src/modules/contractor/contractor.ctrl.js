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

    mod.controller('myskillsCtrl', [
        'Restangular', 'skillContext', '$scope',
        'mySkillsContext', 'modalService', 'skillModel', 'CrudCreator',
        function (RestAngular, ctx, $scope, myskillsCtx, modalService, model, ngCrud) {
            ngCrud.extendController({
                name: 'skills',
                displayName: 'Skills',
                ctrl: this,
                scope: $scope,
                model: model,
                url: myskillsCtx
            });

            //Servicio para obtener la lista completa de registros que se pueden seleccionar
            var allSvc = RestAngular.all(ctx);

            var svc = RestAngular.all(myskillsCtx);

            $scope.records = svc.getList().$object;

            var self = this;

            this.fetchRecords = function () {
                return svc.getList().then(function (data) {
                    $scope.records = data;
                    return data;
                });
            };

            this.deleteRecord = function (rc) {
                return rc.remove().then(this.fetchRecords);
            };

            this.showList = function () {
                var modal = modalService.createSelectionModal($scope.displayName, allSvc.getList(), $scope.records);
                modal.result.then(function () {
                    self.fetchRecords();
                }, function () {
                    self.fetchRecords();
                });
            };

            this.globalActions = [{
                    name: 'select',
                    displayName: 'Select',
                    icon: 'check',
                    fn: function () {
                        self.showList();
                    },
                    show: function () {
                        return !self.editMode && $scope.records;
                    }
                }];

            this.recordActions = {
                delete: {
                    displayName: 'Delete',
                    icon: 'minus',
                    fn: function (rc) {
                        self.deleteRecord(rc);
                    },
                    show: function () {
                        return !self.readOnly;
                    }
                }
            };
        }]);
})(window.angular);
