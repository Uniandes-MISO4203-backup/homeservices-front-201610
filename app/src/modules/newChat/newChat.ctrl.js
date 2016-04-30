(function (ng) {
    var mod = ng.module('newChatModule');

    mod.controller('newChatCtrl', ['Restangular', '$scope', '$stateParams','$state',
        function (Restangular, $scope, $stateParams,$state) {
            var chat = Restangular.all('chat'),
                customer = $stateParams.customer,
                contractor = $stateParams.contractor;


            // Send Messages
            $scope.send2 = function () {
                var day = $scope.fecha.getDate().toString(),
                    month = ($scope.fecha.getMonth() + 1).toString(),
                    year = $scope.fecha.getFullYear().toString(),
                    fechaval = year + '-' + month + '-' + day,
                    newMessage = {
                        idCustomer: customer,
                        idContractor: contractor,
                        creationDate: fechaval
                    };
                if (day.length < 2) {
                    day = '0' + day;
                }
                if (month.length < 2) {
                    month = '0' + month;
                }
                chat.post(newMessage).then (function () {
                    $state.go('serviceRequestPrices', {serviceRequestId: $stateParams.service});
                });
            };
        }
    ]);
})(window.angular);
