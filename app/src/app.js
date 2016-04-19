(function (ng) {
    var mod = ng.module('mainApp', [
        'categoryModule',
        'contractorModule',
        'customerModule',
        'serviceRequestModule',
        'serviceRequestPricesModule',
        'skillModule',
        'statusModule',
        'workExperienceModule',
        'educationModule',
        'catalogModule',
        'accountModule',
        'authModule',
        'chatModule',
        'newChatModule',
        'ui.router',
        'ngCrud',
        'roleModule',
        'priceRequestModule'
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
                    .state('contractorByExperience', {
                        url: '/contractor?experienceName',
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
                        /*templateUrl: 'src/modules/serviceRequest/serviceRequest.tpl.html',*/
                        templateUrl: tplUrl,
                        controller: 'serviceRequestCtrl',
                        controllerAs: alias
                    })
                    .state('serviceRequestPrices', {
                        url: '/serviceRequestPrices?serviceRequestId',
                        templateUrl: 'src/modules/serviceRequestPrices/serviceRequestPrices.tpl.html',
                        controller: 'serviceRequestPricesCtrl',
                        controllerAs: 'ctrl'
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
                    .state('chat', {
                        url: '/chat/:chatName',
                        templateUrl: 'src/modules/chat/chat.tpl.html',
                        controller: 'chatCtrl',
                        controllerAs: alias


                    })
                    .state('newchat', {
                        url: '/newchat/:customer/:contractor',
                        templateUrl: 'src/modules/newChat/newChat.tpl.html',
                        controller: 'newChatCtrl',
                        controllerAs: alias


                    })
                    .state('myskills', {
                        url: '/myskills',
                        templateUrl: tplUrl,
                        controller: 'myskillsCtrl',
                        controllerAs: alias
                    })
                    .state('contractorsByExpectedSkills', {
                        url: '/contractor?idServiceRequest',
                        templateUrl: tplUrl,
                        controller: 'contractorCtrl',
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
                    },{
                        id: 'priceRequests',
                        label: 'Price Requests',
                        icon: 'list-alt',
                        state: 'priceRequests'
                    }]});
        }]);
})(window.angular);
