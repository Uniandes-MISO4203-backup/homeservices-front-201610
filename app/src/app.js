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
        'educationModule',
        'catalogModule',
        'accountModule',
        'authModule',
        'ui.router',
        'ngCrud',
        'roleModule'
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
                    .state('contractorBySkill', {
                        url: '/contractor?skillName',
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
                        url: '/serviceRequest/?description',
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
                    })
                    .state('catalog', {
                        url: '/catalog',
                        templateUrl: tplUrl,
                        controller: 'catalogCtrl',
                        controllerAs: alias
                    })
                    .state('profile', {
                        url: '/profile',
                        templateUrl: 'src/modules/account/profile.tpl.html',
                        controller: 'profileCtrl',
                        controllerAs: 'ctrl'
                    })
                    .state('searchSR', {
                        url: '/searchSR',
                        templateUrl: 'src/modules/searchServiceRequest/searchServiceRequest.tpl.html'

                    })
                    .state('myskills', {
                        url: '/myskills',
                        templateUrl: tplUrl,
                        controller: 'myskillsCtrl',
                        controllerAs: alias
                    });
        }]);

    mod.config(['authServiceProvider', function (auth) {
            auth.setValues({
                apiUrl: 'http://localhost:8080/home-services-api/api/users/',
                successState: 'catalog'
            });
            auth.setRoles({
                'customer': [{
                        id: 'catalog',
                        label: 'Catalog',
                        icon: 'list-alt',
                        state: 'catalog'
                    }, {
                        id: 'profile',
                        label: 'Profile',
                        icon: 'list-alt',
                        state: 'profile'
                    }, {
                        id: 'customer',
                        label: 'Customer',
                        icon: 'list-alt',
                        state: 'customer'
                    }, {
                        id: 'serviceRequest',
                        label: 'Service Requests',
                        icon: 'list-alt',
                        state: 'serviceRequest'
                    }],
                'contractor': [{
                        id: 'profile',
                        label: 'Profile',
                        icon: 'list-alt',
                        state: 'profile'
                    }, {
                        id: 'contractor',
                        label: 'Contractor',
                        icon: 'list-alt',
                        state: 'contractor'
                    }, {
                        id: 'myskills',
                        label: 'Skills',
                        icon: 'list-alt',
                        state: 'myskills'
                    }]});
        }]);
})(window.angular);
