(function (ng) {
    var mod = ng.module('mainApp', [
        //'ngCrudMock',
        'categoryModule',
        'contractorModule',
        'customerModule',
        'serviceRequestModule',
        'skillModule',
        'statusModule',
        'workExperienceModule',
        'authModule',
        'ui.router',
        'ngCrud'
    ]);

    mod.config(['$logProvider', function ($logProvider) {
            $logProvider.debugEnabled(true);
        }]);

    mod.config(['RestangularProvider', function (rp) {
            rp.setBaseUrl('http://localhost:8080/home-services-api/api/');
        }]);

    mod.config(['$stateProvider', '$urlRouterProvider', 'CrudTemplateURL', 'CrudCtrlAlias', function ($stateProvider, $urlRouterProvider, tplUrl, alias) {
            $stateProvider
                .state('category', {
                    url: '/category',
                    templateUrl: tplUrl,
                    controller: 'categoryCtrl',
                    controllerAs: alias
                })
                .state('contractor', {
                    url: '/contractor',
                    templateUrl: tplUrl,
                    controller: 'contractorCtrl',
                    controllerAs: alias
                })
                .state('customer', {
                    url: '/customer',
                    templateUrl: tplUrl,
                    controller: 'customerCtrl',
                    controllerAs: alias
                })
                .state('serviceRequest', {
                    url: '/serviceRequest',
                    templateUrl: tplUrl,
                    controller: 'serviceRequestCtrl',
                    controllerAs: alias
                })
                .state('skill', {
                    url: '/skill',
                    templateUrl: tplUrl,
                    controller: 'skillCtrl',
                    controllerAs: alias
                })
                .state('status', {
                    url: '/status',
                    templateUrl: tplUrl,
                    controller: 'statusCtrl',
                    controllerAs: alias
                });
            $urlRouterProvider.otherwise('/');
        }]);

    mod.config(['authServiceProvider', function (auth) {
            auth.setValues({
                apiUrl: 'http://localhost:8080/home-services-api/api/users/',
                successState: 'category'
            });
            auth.setRoles({'contractor': [{id: 'indexContractor', label: 'Contractor', icon: 'list-alt', state: 'contractor'}],
           'customer': [{id: 'indexCustomer', label: 'Customer', icon: 'list-alt', state: 'customer'}]}) ;
        }]);
})(window.angular);
