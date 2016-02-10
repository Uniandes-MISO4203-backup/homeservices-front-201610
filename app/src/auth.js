(function (ng) {
    var mod = ng.module('roleModule', ['ngCrud']);
    mod.controller('roleCtrl', ['$rootScope','Restangular', function ($rootScope,Restangular) {

        $rootScope.auth = function () {
            Restangular.all("users").customGET('me').then(function (response) {
                if (response == null) {
                    $rootScope.catalog = false;
                    $rootScope.profile = false;
                    $rootScope.serviceRequest = false;
                    $rootScope.myskills = false;
                    $rootScope.contractor = false;
                    $rootScope.customer = false;
                    $rootScope.category = false;
                    $rootScope.skill = false;
                    $rootScope.status = false;
                }else {
                    var roles = $rootScope.roles = response.roles;
                    if (roles.indexOf("customer") !== -1) {
                        $rootScope.catalog = true;
                        $rootScope.profile = true;
                        $rootScope.serviceRequest = true;
                        $rootScope.customer = true;
                        $rootScope.myskills = false;
                        $rootScope.contractor = false;
                        $rootScope.category = false;
                        $rootScope.skill = false;
                        $rootScope.status = false;
                    }
                    if (roles.indexOf("contractor") !== -1) {
                        $rootScope.profile = true;
                        $rootScope.myskills = true;
                        $rootScope.contractor = true;
                        $rootScope.catalog = false;
                        $rootScope.customer = false;
                        $rootScope.serviceRequest = false;
                        $rootScope.category = false;
                        $rootScope.skill = false;
                        $rootScope.status = false;
                    }
                    if (roles.indexOf("admin") !== -1) {
                        $rootScope.catalog = true;
                        $rootScope.profile = true;
                        $rootScope.serviceRequest = false;
                        $rootScope.myskills = true;
                        $rootScope.contractor = true;
                        $rootScope.customer = true;
                        $rootScope.category = true;
                        $rootScope.skill = true;
                        $rootScope.status = true;
                    }
                }


            });
        };
        $rootScope.auth();
        $rootScope.$on('logged-in', function () {

            $rootScope.auth();
        });

        $rootScope.$on('logged-out', function () {

            $rootScope.auth();
        });

    }]);
})(window.angular);




